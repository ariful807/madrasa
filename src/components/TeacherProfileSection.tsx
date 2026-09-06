import { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Phone, 
  Mail, 
  Search, 
  Users, 
  Award,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { TeacherItem } from '../types';
import { formatDriveImageUrl } from '../utils/imageUtils';

interface TeacherProfileSectionProps {
  teachers: TeacherItem[];
}

export function TeacherProfileSection({ teachers }: TeacherProfileSectionProps) {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTeacherModal, setActiveTeacherModal] = useState<TeacherItem | null>(null);

  // Extract unique departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    teachers.forEach(t => {
      if (t.department) set.add(t.department);
    });
    return Array.from(set);
  }, [teachers]);

  // Filter teachers
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      if (teacher.isActive === false) return false;
      
      // Dept filter
      if (selectedDept !== 'all' && teacher.department !== selectedDept) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = teacher.name.toLowerCase().includes(q);
        const matchDesig = teacher.designation.toLowerCase().includes(q);
        const matchDept = teacher.department.toLowerCase().includes(q);
        const matchQual = teacher.qualification?.toLowerCase().includes(q) || false;
        return matchName || matchDesig || matchDept || matchQual;
      }

      return true;
    });
  }, [teachers, selectedDept, searchQuery]);

  return (
    <div className="space-y-8" id="teachers-profile-section">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-serif uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          <span>সম্মানিত উস্তাদ ও শিক্ষক পরিষদ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900">
          আমাদের সম্মানিত শিক্ষক ও উস্তাদমণ্ডলী
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-serif leading-relaxed">
          দারুল উলুম দেওবন্দ ও দেশের শীর্ষস্থানীয় জামেয়া থেকে ফারেগ প্রাজ্ঞ ও অভিজ্ঞ হক্কানি আলেম এবং আন্তর্জাতিক মানের হাফেজ ও ক্বারী সাহেবগণের নিবিড় তত্ত্বাবধানে শিক্ষা কার্যক্রম পরিচালিত হয়।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 font-serif">
        
        {/* Department Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedDept === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200'
            }`}
            id="dept-filter-all"
          >
            <Filter className="w-3 h-3" />
            <span>সকল শিক্ষক ({teachers.length})</span>
          </button>

          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDept === dept
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200'
              }`}
              id={`dept-filter-${dept}`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শিক্ষকের নাম বা পদবি খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-serif"
            id="search-teachers-input"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              মুছুন
            </button>
          )}
        </div>

      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-serif text-base font-semibold">
            কোনো শিক্ষক পাওয়া যায়নি
          </p>
          <p className="text-xs text-slate-400 mt-1">
            অনুগ্রহ করে ভিন্ন কোনো পদবি বা নাম লিখে পুনরায় চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => {
            const photoUrl = formatDriveImageUrl(teacher.imageUrl);
            
            return (
              <div
                key={teacher.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                id={`teacher-card-${teacher.id}`}
              >
                {/* Top Colored Header Accent */}
                <div className="h-2 bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 group-hover:h-2.5 transition-all" />

                <div className="p-5 flex-1 flex flex-col items-center text-center">
                  
                  {/* Photo / Avatar */}
                  <div className="relative mb-4">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={teacher.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-emerald-100 shadow-sm group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-950 text-white flex items-center justify-center font-arabic text-3xl font-bold shadow-sm border-2 border-emerald-200">
                        {teacher.name.charAt(0) || 'ع'}
                      </div>
                    )}
                    
                    {/* Department Tag Overlay */}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-800 text-amber-300 font-serif shadow-xs whitespace-nowrap border border-emerald-600">
                      {teacher.department}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-emerald-900 transition-colors mt-2 leading-snug">
                    {teacher.name}
                  </h3>

                  {/* Designation (পদ) */}
                  <div className="mt-1.5 mb-3 inline-block px-3 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold font-serif">
                    {teacher.designation}
                  </div>

                  {/* Qualification & Experience details */}
                  <div className="w-full text-left space-y-2 pt-3 border-t border-slate-100 text-xs font-serif text-slate-600 flex-1">
                    {teacher.qualification && (
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 text-slate-700">
                          {teacher.qualification}
                        </span>
                      </div>
                    )}

                    {teacher.experience && (
                      <div className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-slate-600">
                          অভিজ্ঞতা: {teacher.experience}
                        </span>
                      </div>
                    )}

                    {teacher.bio && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 pt-1 border-t border-dashed border-slate-100 italic">
                        "{teacher.bio}"
                      </p>
                    )}
                  </div>

                </div>

                {/* Footer / Contact Details */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs font-serif">
                  {teacher.phone ? (
                    <a
                      href={`tel:${teacher.phone}`}
                      className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1.5 transition-colors"
                      title="যোগাযোগ করুন"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{teacher.phone}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400 text-[11px]">মারকাযুল ইহসান</span>
                  )}

                  <button
                    onClick={() => setActiveTeacherModal(teacher)}
                    className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                    id={`view-teacher-details-${teacher.id}`}
                  >
                    বিস্তারিত
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Teacher Detailed Modal */}
      {activeTeacherModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveTeacherModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-5 font-serif"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              {activeTeacherModal.imageUrl ? (
                <img
                  src={formatDriveImageUrl(activeTeacherModal.imageUrl)}
                  alt={activeTeacherModal.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-700/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-arabic text-2xl font-bold">
                  {activeTeacherModal.name.charAt(0)}
                </div>
              )}
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {activeTeacherModal.department}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {activeTeacherModal.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-800">
                  {activeTeacherModal.designation}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              {activeTeacherModal.qualification && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-emerald-900 block mb-0.5">শিক্ষাগত যোগ্যতা:</strong>
                  <p>{activeTeacherModal.qualification}</p>
                </div>
              )}

              {activeTeacherModal.experience && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-emerald-900 block mb-0.5">শিক্ষকতার অভিজ্ঞতা:</strong>
                  <p>{activeTeacherModal.experience}</p>
                </div>
              )}

              {activeTeacherModal.bio && (
                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <strong className="text-emerald-900 block mb-0.5">সংক্ষিপ্ত পরিচিতি ও খেদমত:</strong>
                  <p className="italic leading-relaxed">{activeTeacherModal.bio}</p>
                </div>
              )}

              {activeTeacherModal.phone && (
                <div className="flex items-center gap-2 pt-2 text-slate-800">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>মোবাইল: <strong>{activeTeacherModal.phone}</strong></span>
                </div>
              )}

              {activeTeacherModal.email && (
                <div className="flex items-center gap-2 text-slate-800">
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>ইমেইল: <strong>{activeTeacherModal.email}</strong></span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveTeacherModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
