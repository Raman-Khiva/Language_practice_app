'use client'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FiClock,
  FiSettings,
  FiLogOut,
  FiTrendingUp,
  FiBook,
  FiTarget,
  FiFolder
} from 'react-icons/fi';
import { updateUserProfile } from '../../app/store/slices/authSlice';

export default function ProfilePage({ user }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const userHandle = user?.email ? `@${user.email.split('@')[0]}` : '@nativelearner';

  const levelInfo = {
    level: 12,
    xp: 8450,
    goal: 10000,
    nextPercent: 85,
  };

  const highlightStats = [
    { label: 'Overall Accuracy', value: '87%', icon: FiTarget, accent: 'bg-violet-100 text-violet-600' },
    { label: 'Lessons Completed', value: '156', icon: FiBook, accent: 'bg-indigo-100 text-indigo-600' },
    { label: 'Success Rate', value: '73%', icon: FiTrendingUp, accent: 'bg-green-100 text-green-600' },
    { label: 'Active Categories', value: '8', icon: FiFolder, accent: 'bg-rose-100 text-rose-600' },
  ];

  const sidebarStats = [
    { label: 'Joined', value: 'Jan 2024' },
    { label: 'Lessons Attempted', value: '234' },
    { label: 'Time Practiced', value: '47h 23m' },
  ];

  const streakWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const streakMatrix = [
    [1, 2, 3, 2, 1, 3, 4],
    [2, 3, 4, 3, 2, 3, 1],
    [3, 4, 4, 2, 2, 4, 3],
    [4, 4, 3, 3, 4, 3, 2],
    [4, 3, 2, 3, 4, 4, 3],
    [3, 2, 1, 2, 3, 3, 2],
    [2, 2, 2, 3, 3, 2, 1],
    [3, 4, 4, 4, 4, 3, 2],
    [4, 4, 3, 3, 4, 4, 3],
    [3, 3, 2, 2, 3, 3, 2],
    [2, 3, 3, 3, 4, 4, 3],
    [4, 4, 4, 4, 4, 4, 4],
  ];
  const intensityClasses = [
    'bg-gray-100',
    'bg-violet-100',
    'bg-violet-200',
    'bg-violet-300',
    'bg-violet-500'
  ];

  const difficultyPerformance = [
    { label: 'Lvl 1-2', value: 98 },
    { label: 'Lvl 3-4', value: 95 },
    { label: 'Lvl 5-6', value: 90 },
    { label: 'Lvl 7-8', value: 87 },
    { label: 'Lvl 9-10', value: 82 },
    { label: 'Lvl 11-12', value: 78 },
  ];

  const categoryProgress = [
    { label: 'Family', value: 21, color: '#7C3AED' },
    { label: 'Food', value: 23, color: '#A855F7' },
    { label: 'Travel', value: 19, color: '#3B82F6' },
    { label: 'Business', value: 16, color: '#F97316' },
    { label: 'Hobbies', value: 22, color: '#22C55E' },
  ];
  const totalCategory = categoryProgress.reduce((sum, item) => sum + item.value, 0);
  let categoryCursor = 0;
  const categoryGradient = `conic-gradient(${categoryProgress
    .map((item) => {
      const start = (categoryCursor / totalCategory) * 100;
      categoryCursor += item.value;
      const end = (categoryCursor / totalCategory) * 100;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(', ')})`;

  const progressOverTime = [
    { label: 'Week 1', score: 62 },
    { label: 'Week 2', score: 66 },
    { label: 'Week 3', score: 70 },
    { label: 'Week 4', score: 74 },
    { label: 'Week 5', score: 78 },
    { label: 'Week 6', score: 82 },
    { label: 'Week 7', score: 85 },
    { label: 'Week 8', score: 88 },
  ];
  const progressChartWidth = 520;
  const progressChartHeight = 220;
  const maxProgressScore = Math.max(...progressOverTime.map((entry) => entry.score), 1);
  const progressPoints = progressOverTime
    .map((entry, index) => {
      const x = progressOverTime.length === 1 ? progressChartWidth / 2 : (index / (progressOverTime.length - 1)) * progressChartWidth;
      const y = progressChartHeight - (entry.score / maxProgressScore) * (progressChartHeight - 40);
      return `${x},${y}`;
    })
    .join(' ');
  const progressPolygon = `${progressPoints} ${progressChartWidth},${progressChartHeight} 0,${progressChartHeight}`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 p-6 space-y-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-3xl font-semibold flex items-center justify-center">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{user?.name || 'Alex Thompson'}</h1>
                  <p className="text-sm text-gray-500">{userHandle}</p>
                  <p className="text-sm text-gray-400 mt-1">ES Spain</p>
                </div>
              </div>
              <div className="space-y-4">
                {sidebarStats.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium shadow-md shadow-violet-200 hover:shadow-lg transition-shadow"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              {isEditing && (
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-wide text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-wide text-gray-400">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 rounded-xl bg-green-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 rounded-xl bg-gray-100 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-3xl shadow-lg shadow-violet-100 p-5 space-y-3">
              <button className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-violet-50">
                <FiSettings className="text-lg text-indigo-500" />
                Settings
              </button>
              <button className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50">
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          </aside>

          <main className="flex-1 space-y-6">
            <section className="bg-white rounded-3xl shadow-xl shadow-violet-100 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-base sm:text-lg text-gray-500">Hi, {user?.name?.split(' ')[0] || 'Alex'} 👋</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Keep up the great work! You're making amazing progress.
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Current Level</p>
                    <p className="text-3xl font-semibold text-indigo-600">Level {levelInfo.level}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">{levelInfo.xp.toLocaleString()}</span>
                    {' '}/ {levelInfo.goal.toLocaleString()} XP
                  </div>
                </div>
                <div className="h-4 w-full rounded-full bg-indigo-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${Math.min(Math.round((levelInfo.xp / levelInfo.goal) * 100), 100)}%` }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-400">{levelInfo.nextPercent}% to next level</p>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {highlightStats.map(({ label, value, icon: Icon, accent }) => (
                <div key={label} className="bg-white rounded-3xl shadow-lg shadow-violet-100 p-5 flex flex-col gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${accent}`}>
                    <Icon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-white rounded-3xl shadow-xl shadow-violet-100 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Activity Streak</h3>
                  <p className="text-sm text-gray-500">Your daily learning activity over the past 12 weeks</p>
                </div>
                <p className="text-sm font-semibold text-indigo-600">87 day streak</p>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-cols-[auto_repeat(12,minmax(0,1fr))] gap-2">
                  <div />
                  {streakMatrix.map((_, index) => (
                    <span key={`week-${index}`} className="text-xs text-gray-400 text-center">
                      W{index + 1}
                    </span>
                  ))}
                  {streakWeekdays.map((day, dayIndex) => (
                    <>
                      <span key={`label-${day}`} className="text-xs text-gray-400">
                        {day}
                      </span>
                      {streakMatrix.map((week, weekIndex) => (
                        <span
                          key={`cell-${weekIndex}-${dayIndex}`}
                          className={`h-4 w-4 rounded ${intensityClasses[week[dayIndex]]}`}
                        />
                      ))}
                    </>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Less</span>
                <div className="flex gap-1">
                  {intensityClasses.slice(1).map((cls, idx) => (
                    <span key={cls} className={`h-3 w-6 rounded ${cls}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance by Difficulty</h3>
                  <p className="text-sm text-gray-500">Your accuracy across different difficulty levels</p>
                </div>
                <div className="h-56 flex items-end gap-4">
                  {difficultyPerformance.map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2 flex-1">
                      <div className="relative w-full h-48 bg-violet-100 rounded-3xl overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-500 to-violet-500 rounded-3xl"
                          style={{ height: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500">{item.label}</span>
                      <span className="text-xs text-gray-400">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Progress by Category</h3>
                  <p className="text-sm text-gray-500">Completion percentage across learning categories</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div
                    className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-inner shadow-violet-100"
                    style={{ background: categoryGradient }}
                  >
                    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center text-sm font-semibold text-indigo-600">
                      100%
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {categoryProgress.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className="font-semibold text-gray-700">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-xl shadow-violet-100 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Progress Over Time</h3>
                <p className="text-sm text-gray-500">Track your learning journey week by week</p>
              </div>
              <div className="overflow-x-auto">
                <svg
                  width={progressChartWidth}
                  height={progressChartHeight}
                  viewBox={`0 0 ${progressChartWidth} ${progressChartHeight}`}
                  className="w-full min-w-[32rem]"
                >
                  <defs>
                    <linearGradient id="progressGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={progressPolygon} fill="url(#progressGradient)" />
                  <polyline
                    points={progressPoints}
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {progressOverTime.map((entry, index) => {
                    const x = progressOverTime.length === 1 ? progressChartWidth / 2 : (index / (progressOverTime.length - 1)) * progressChartWidth;
                    const y = progressChartHeight - (entry.score / maxProgressScore) * (progressChartHeight - 40);
                    return (
                      <g key={entry.label}>
                        <circle cx={x} cy={y} r={5} className="fill-white stroke-purple-500" strokeWidth={2} />
                        <text x={x} y={progressChartHeight - 10} textAnchor="middle" className="text-xs fill-gray-400">
                          {entry.label}
                        </text>
                      </g>
                    );
                  })}
                  <text x={0} y={20} className="text-xs fill-gray-300">100%</text>
                  <text x={0} y={progressChartHeight - 40} className="text-xs fill-gray-300">0%</text>
                </svg>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
