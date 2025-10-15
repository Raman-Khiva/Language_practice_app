'use client'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight, FiClock, FiDroplet } from 'react-icons/fi';
import { updateUserProfile } from '../../app/store/slices/authSlice';

export default function ProfilePage({ user }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const streakMonth = 'October 2025';
  const streakWeeks = [
    ['29', '30', '1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '10', '11', '12'],
    ['13', '14', '15', '16', '17', '18', '19'],
    ['20', '21', '22', '23', '24', '25', '26'],
    ['27', '28', '29', '30', '31', '', ''],
  ];
  const completedDays = new Set(['29', '30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  const warmupDays = new Set(['13', '14']);
  const currentDay = '15';
  const upcomingDays = new Set(['16']);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex flex-col items-center space-y-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <span className="text-sm text-gray-500">
                      Joined {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.name || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.email || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </div>

              {isEditing && (
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mt-6">
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Problems Solved</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Streak Days</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-gray-600">Points Earned</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">No recent activity</p>
                      <p className="text-xs text-gray-500">Start learning to see your progress here</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
                  <div className="space-y-3">
                    <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">No languages added yet</p>
                      <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Add Language
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
                  <div className="space-y-3">
                    <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">No achievements yet</p>
                      <p className="text-xs text-gray-400 mt-1">Complete lessons to earn badges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-200/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                        <FiDroplet className="text-sm text-amber-600" />
                        Streak Society
                      </span>
                      <p className="text-2xl sm:text-3xl font-bold text-amber-700">118 day streak</p>
                    </div>
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-amber-200 bg-white/80 text-amber-500 shadow-lg">
                      <FiDroplet className="text-2xl" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 sm:px-5 sm:py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <FiClock className="text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-700">Do a lesson today to extend your streak!</p>
                        <p className="text-xs text-amber-500">Keep the momentum going.</p>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-sky-600 transition-colors">
                      Extend Streak
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Calendar</h3>
                    <div className="rounded-2xl border border-amber-100 bg-white shadow">
                      <div className="flex items-center justify-between border-b border-amber-100 px-4 py-3">
                        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-500 hover:bg-amber-100">
                          <FiChevronLeft className="text-base" />
                        </button>
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-700">{streakMonth}</span>
                        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-500 hover:bg-amber-100">
                          <FiChevronRight className="text-base" />
                        </button>
                      </div>
                      <div className="px-4 pb-4 pt-3 space-y-2.5">
                        <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label) => (
                            <span key={label}>{label}</span>
                          ))}
                        </div>
                        <div className="space-y-1.5">
                          {streakWeeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="grid grid-cols-7 gap-2">
                              {week.map((day, dayIndex) => {
                                if (!day) {
                                  return <div key={`${weekIndex}-${dayIndex}`} />;
                                }

                                const isCompleted = completedDays.has(day);
                                const isWarmup = warmupDays.has(day);
                                const isCurrent = day === currentDay;
                                const isUpcoming = upcomingDays.has(day);

                                let classes = 'flex h-8 sm:h-9 items-center justify-center rounded-full text-xs sm:text-sm font-semibold';

                                if (isCompleted) {
                                  classes += ' bg-orange-500 text-white shadow';
                                } else if (isCurrent) {
                                  classes += ' border-2 border-orange-500 bg-orange-50 text-orange-600';
                                } else if (isWarmup) {
                                  classes += ' bg-orange-100 text-orange-600';
                                } else if (isUpcoming) {
                                  classes += ' bg-gray-100 text-gray-400';
                                } else {
                                  classes += ' text-gray-300';
                                }

                                return (
                                  <div key={`${weekIndex}-${day}`} className={classes}>
                                    {day}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
