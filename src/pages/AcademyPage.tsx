import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../components/layout/LanguageContext';
import {
  ACADEMY_TRACKS,
  MOCK_COURSES,
  MOCK_WEBINARS,
  MOCK_CERTIFICATES,
  type Course,
  type Lesson,
  type UserCertificate,
} from '../data/mockAcademy';
import {
  GraduationCap, Play, CheckCircle, Award,
  Tv, HelpCircle, Download, BookOpen,
  Sparkles, Baby, Users, ShieldCheck,
  ChevronRight, X, Search, Video
} from 'lucide-react';

export const AcademyView: React.FC = () => {
  const { language, activeView } = useLanguage();

  /* ── Active Academy Sub-section ── */
  type AcademySection = 'hub' | 'children' | 'youth' | 'gebi-gubaye' | 'adults' | 'clergy' | 'certificates' | 'webinars';
  const [currentSection, setCurrentSection] = useState<AcademySection>('hub');
  const [selectedGebiYear, setSelectedGebiYear] = useState<'All' | 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4'>('All');

  /* ── Sync with URL/activeView ── */
  useEffect(() => {
    if (activeView === 'academy') {
      setCurrentSection('hub');
    } else if (activeView === 'academy/children') {
      setCurrentSection('children');
    } else if (activeView === 'academy/youth') {
      setCurrentSection('youth');
    } else if (activeView === 'academy/gebi' || activeView === 'academy/gebi-gubaye') {
      setCurrentSection('gebi-gubaye');
    } else if (activeView === 'academy/gebi-gubaye/year-1') {
      setCurrentSection('gebi-gubaye');
      setSelectedGebiYear('Year 1');
    } else if (activeView === 'academy/gebi-gubaye/year-2') {
      setCurrentSection('gebi-gubaye');
      setSelectedGebiYear('Year 2');
    } else if (activeView === 'academy/gebi-gubaye/year-3') {
      setCurrentSection('gebi-gubaye');
      setSelectedGebiYear('Year 3');
    } else if (activeView === 'academy/gebi-gubaye/year-4') {
      setCurrentSection('gebi-gubaye');
      setSelectedGebiYear('Year 4');
    } else if (activeView === 'academy/adults' || activeView === 'academy/adult') {
      setCurrentSection('adults');
    } else if (activeView === 'academy/clergy') {
      setCurrentSection('clergy');
    } else if (activeView === 'academy/certificates') {
      setCurrentSection('certificates');
    } else if (activeView === 'academy/webinars') {
      setCurrentSection('webinars');
    }
  }, [activeView]);

  /* ── Course Player & Lesson Modal State ── */
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<UserCertificate | null>(null);

  /* ── Search State ── */
  const [courseSearch, setCourseSearch] = useState('');

  /* ── Filtered Courses for Active Track ── */
  const trackCourses = useMemo(() => {
    return MOCK_COURSES.filter((c) => {
      // Track match
      if (currentSection === 'children' && c.trackId !== 'children') return false;
      if (currentSection === 'youth' && c.trackId !== 'youth') return false;
      if (currentSection === 'gebi-gubaye') {
        if (c.trackId !== 'gebi-gubaye') return false;
        if (selectedGebiYear !== 'All' && c.yearLevel !== selectedGebiYear) return false;
      }
      if (currentSection === 'adults' && c.trackId !== 'adults') return false;
      if (currentSection === 'clergy' && c.trackId !== 'clergy') return false;

      // Search match
      if (courseSearch) {
        const q = courseSearch.toLowerCase();
        const matches =
          c.titleEn.toLowerCase().includes(q) ||
          c.titleAm.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.descriptionEn.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [currentSection, selectedGebiYear, courseSearch]);

  /* ── Open Course Player ── */
  const openCoursePlayer = (course: Course, lessonIndex: number = 0) => {
    setActiveCourse(course);
    setActiveLesson(course.lessons[lessonIndex] || course.lessons[0] || null);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
  };

  /* ── Handle Quiz Submission ── */
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizSelectedOption === null || !activeLesson) return;
    setQuizSubmitted(true);
    if (quizSelectedOption === activeLesson.quiz.correctIndex) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8A84B', '#800020', '#006B3C', '#FFD700'],
      });
    }
  };

  /* ── Download Certificate Text Simulation ── */
  const handleDownloadCert = (cert: UserCertificate) => {
    const certText = `=====================================================
ETHIOPIAN ORTHODOX TEWAHEDO CHURCH
TEWAHEDO ACADEMY & MAHIBERE KIDUSAN
OFFICIAL CERTIFICATE OF THEOLOGICAL COMPLETION
=====================================================
Certificate Number: ${cert.certificateNumber}
This certifies that:
        ${cert.recipientName}
has successfully completed the prescribed curriculum for:
        ${cert.courseTitleEn}
        (${cert.courseTitleAm})
Track: ${cert.trackName}
Grade Achieved: ${cert.grade}
Date Issued: ${cert.issueDate} (${cert.issueDateAm})
Endorsed by: ${cert.endorsedBy}

"ጥበብን የሚወድድ አባቱን ደስ ያሰኛል" — ምሳሌ ፳፱ ፡ ፫
"Whoever loves wisdom brings joy to his father" (Proverbs 29:3)
=====================================================
Digitally signed & verified by Holy Synod Sunday School Dept.`;

    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cert.certificateNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fadeIn max-w-7xl">

      {/* ══ 1. HERO WITH TRACK NAVIGATION TABS ══════════════════════ */}
      <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              {language === 'am' ? 'ተዋሕዶ አካደሚ' : 'TEWAHEDO ACADEMY'}
            </span>
            <span className="bg-white/10 text-stone-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
              Built on Mahibere Kidusan Gebi Gubaye Curriculum
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
            {language === 'am' ? 'ትምህርተ ተዋሕዶ — ለሁሉም ዕድሜ' : 'Structured Orthodox Theological Education'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-200 leading-relaxed max-w-3xl">
            {language === 'am'
              ? 'ከሕፃናት እስከ ከፍተኛ የሥነ መለኮት ምሁራን ድረስ የተዘጋጀ ሥርዓተ ትምህርት። በቅዱስ ሲኖዶስና በማኅበረ ቅዱሳን ዕውቅና የተሰጣቸው ዲጂታል የትምህርት ማረጋገጫዎች።'
              : 'Structured Orthodox Christian curriculum tailored for all age groups. Certified programs endorsed by the EOTC Patriarchate and Mahibere Kidusan.'}
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'hub' as const, labelEn: 'Academy Hub', labelAm: 'ዋና ማዕከል', icon: BookOpen },
            { id: 'children' as const, labelEn: 'Children (5–12)', labelAm: 'ሕፃናት (5-12)', icon: Baby },
            { id: 'youth' as const, labelEn: 'Youth (13–18)', labelAm: 'ወጣቶች (13-18)', icon: Sparkles },
            { id: 'gebi-gubaye' as const, labelEn: 'Gebi Gubaye (18–25)', labelAm: 'ግቢ ጉባኤ', icon: GraduationCap },
            { id: 'adults' as const, labelEn: 'Adults & Catechumens', labelAm: 'አዋቂዎች', icon: Users },
            { id: 'clergy' as const, labelEn: 'Clergy & Scholars', labelAm: 'ካህናት', icon: Award },
            { id: 'certificates' as const, labelEn: 'My Certificates', labelAm: 'የምስክር ወረቀቶች', icon: ShieldCheck },
            { id: 'webinars' as const, labelEn: 'Live Webinars', labelAm: 'የቀጥታ ስብከቶች', icon: Tv },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentSection(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-md scale-105'
                    : 'bg-white/10 text-stone-200 hover:bg-white/20 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'am' ? tab.labelAm : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ══ 2. ACADEMY HUB (MAIN VIEW) ═════════════════════════════ */}
      {currentSection === 'hub' && (
        <div className="space-y-10 animate-fadeIn">
          {/* 5 Track Category Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="badge-gold text-[10px] uppercase font-bold">EDUCATIONAL PATHWAYS</span>
                <h3 className="text-2xl font-black text-[#2C1D07] font-serif">Explore Learning Tracks</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ACADEMY_TRACKS.map((track) => (
                <div
                  key={track.id}
                  onClick={() => setCurrentSection(track.id as any)}
                  className="bg-white p-5 rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="badge-gold text-[9px]">{track.ageRange}</span>
                      <span className="text-[10px] font-bold text-[#855B09]">{track.coursesCount} Courses</span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                        {track.nameAmharic}
                      </h4>
                      <p className="text-xs font-semibold text-[#855B09]">{track.nameEnglish}</p>
                    </div>

                    <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                      {track.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span>Enter Track</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Enrolling Course Spotlight */}
          <div className="bg-white rounded-3xl border border-[#E6DFD1] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center">
            <div className="p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  NOW ENROLLING • 2026/2027 ACADEMIC YEAR
                </span>
                <span className="text-xs text-[#855B09] font-bold font-mono">Gebi Gubaye Track</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">
                  {MOCK_COURSES[2].titleAm}
                </h3>
                <p className="text-sm text-[#855B09] font-bold">{MOCK_COURSES[2].titleEn}</p>
                <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                  {MOCK_COURSES[2].descriptionEn}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] text-xs text-center">
                <div>
                  <div className="font-bold text-[#2C1D07]">Duration</div>
                  <div className="text-[11px] text-[#6B7280]">{MOCK_COURSES[2].duration}</div>
                </div>
                <div>
                  <div className="font-bold text-[#2C1D07]">Lessons</div>
                  <div className="text-[11px] text-[#6B7280]">{MOCK_COURSES[2].totalLessons} Lessons</div>
                </div>
                <div>
                  <div className="font-bold text-[#2C1D07]">Certificate</div>
                  <div className="text-[11px] text-emerald-700 font-bold">Endorsed</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openCoursePlayer(MOCK_COURSES[2])}
                  className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Learning This Course</span>
                </button>
                <button
                  onClick={() => setCurrentSection('gebi-gubaye')}
                  className="px-6 py-3 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-[#2C1D07] text-xs font-bold"
                >
                  View 4-Year Syllabus →
                </button>
              </div>
            </div>

            <div className="h-full min-h-[340px] relative overflow-hidden">
              <img
                src={MOCK_COURSES[2].thumbnail}
                alt={MOCK_COURSES[2].titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-bold text-[#C8A84B]">Instructor: {MOCK_COURSES[2].instructor}</div>
                <div className="text-[11px] text-stone-300">{MOCK_COURSES[2].instructorTitle}</div>
              </div>
            </div>
          </div>

          {/* Upcoming Live Webinar Spotlight */}
          <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E6DFD1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1A2C1C] text-[#C8A84B] flex items-center justify-center shrink-0 border border-[#C8A84B]">
                <Tv className="w-8 h-8 animate-pulse text-red-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border border-red-200">
                    LIVE THEOLOGICAL WEBINAR
                  </span>
                  <span className="text-xs font-mono font-bold text-[#855B09]">{MOCK_WEBINARS[0].dateGregorian}</span>
                </div>
                <h4 className="text-lg font-bold text-[#2C1D07] font-geez">{MOCK_WEBINARS[0].titleAm}</h4>
                <p className="text-xs text-[#855B09] font-medium">{MOCK_WEBINARS[0].titleEn}</p>
                <p className="text-[11px] text-[#6B7280]">
                  Speaker: {MOCK_WEBINARS[0].speaker} ({MOCK_WEBINARS[0].speakerTitle}) • {MOCK_WEBINARS[0].time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <a
                href={MOCK_WEBINARS[0].zoomUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Video className="w-4 h-4" />
                <span>Join Webinar Stream</span>
              </a>
            </div>
          </div>

          {/* Student Progress Dashboard (Logged In) */}
          <div className="bg-white p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E6DFD1] pb-4">
              <div>
                <span className="badge-gold text-[10px] uppercase font-bold">MY LEARNING STATUS</span>
                <h3 className="text-xl font-black text-[#2C1D07] font-serif">LMS Student Progress Dashboard</h3>
              </div>
              <button
                onClick={() => setCurrentSection('certificates')}
                className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1"
              >
                <span>View My {MOCK_CERTIFICATES.length} Certificates</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                <div className="text-xs font-bold text-[#855B09]">Enrolled Courses</div>
                <div className="text-2xl font-black text-[#2C1D07] font-mono">2 Active Courses</div>
                <div className="text-[11px] text-[#6B7280]">Children & Adult Tracks</div>
              </div>
              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                <div className="text-xs font-bold text-[#855B09]">Completed Lessons</div>
                <div className="text-2xl font-black text-[#2C1D07] font-mono">7 Lessons (88%)</div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#E6DFD1]">
                  <div className="bg-[#C8A84B] h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                <div className="text-xs font-bold text-[#855B09]">Verified Certificates</div>
                <div className="text-2xl font-black text-emerald-700 font-mono">2 Certificates</div>
                <div className="text-[11px] text-[#6B7280]">Mahibere Kidusan Certified</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ 3. TRACK-SPECIFIC COURSE LISTINGS ══════════════════════ */}
      {currentSection !== 'hub' && currentSection !== 'certificates' && currentSection !== 'webinars' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Track Header & Filter Bar */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">CURRICULUM TRACK</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif">
                {currentSection === 'children' && 'Wetatoch (Children Ages 5–12)'}
                {currentSection === 'youth' && 'Timhirotoch (Youth Ages 13–18)'}
                {currentSection === 'gebi-gubaye' && 'Mahibere Kidusan Gebi Gubaye (University Fellowship)'}
                {currentSection === 'adults' && 'Yemistir Lij (Adults & Catechumens)'}
                {currentSection === 'clergy' && 'Clergy & Theological Scholars Track'}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                {currentSection === 'children' && 'Interactive 81-book Bible stories, saint profiles, prayers, and Ge’ez alphabet songs.'}
                {currentSection === 'youth' && 'Dogmatic theology, 7 Sacraments, Tewahedo Christology, and Christian ethics.'}
                {currentSection === 'gebi-gubaye' && 'Full 4-Year university curriculum in dogma, scripture, canon law, and apologetics.'}
                {currentSection === 'adults' && 'Catechumen preparation for holy baptism, theology of icons, and marriage prep.'}
                {currentSection === 'clergy' && 'Advanced Ge’ez syntax, Zema chant modes, homiletics, and parish administration.'}
              </p>
            </div>

            {/* Gebi Gubaye Year Filter Tabs */}
            {currentSection === 'gebi-gubaye' && (
              <div className="flex flex-wrap gap-1.5 bg-[#FAF8F3] p-1.5 rounded-2xl border border-[#E6DFD1] shrink-0">
                {(['All', 'Year 1', 'Year 2', 'Year 3', 'Year 4'] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedGebiYear(yr)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedGebiYear === yr
                        ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                        : 'text-[#6B7280] hover:text-[#2C1D07]'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lessons and courses in this track..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E6DFD1] text-xs sm:text-sm focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trackCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge-gold text-[9px] uppercase font-bold shadow-md">
                      {course.categoryEn}
                    </span>
                    {course.yearLevel && (
                      <span className="bg-white/90 text-[#1A2C1C] text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {course.yearLevel}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-base font-bold font-geez">{course.titleAm}</h4>
                    <p className="text-xs text-stone-200">{course.titleEn}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-[#4A3B22] leading-relaxed line-clamp-2">
                      {course.descriptionEn}
                    </p>

                    <div className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#E6DFD1] text-[11px] space-y-1 text-[#6B7280]">
                      <div><strong>Instructor:</strong> {course.instructor}</div>
                      <div><strong>Total Duration:</strong> {course.duration} ({course.totalLessons} Lessons)</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between gap-3">
                    <button
                      onClick={() => openCoursePlayer(course)}
                      className="w-full btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{course.completedLessons > 0 ? 'Continue Learning' : 'Start Course'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 4. MY CERTIFICATES VIEW ════════════════════════════════ */}
      {currentSection === 'certificates' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">OFFICIAL ACCREDITATION</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'የተረጋገጡ የትምህርት ምስክር ወረቀቶች' : 'My Verified Digital Certificates'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Official theological completion diplomas stamped and certified by the EOTC Sunday School Department and Mahibere Kidusan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-[#FFF8E7] to-white p-8 rounded-3xl border-2 border-[#C8A84B] shadow-lg space-y-6 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A84B]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#E6DFD1] pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-[#855B09]" />
                      <span className="font-bold text-xs text-[#855B09] uppercase tracking-wider">EOTC Certificate of Completion</span>
                    </div>
                    <span className="badge-gold text-[9px]">{cert.grade}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#2C1D07] font-geez">{cert.courseTitleAm}</h3>
                    <p className="text-sm font-semibold text-[#855B09]">{cert.courseTitleEn}</p>
                    <p className="text-xs text-[#6B7280] mt-1">Track: {cert.trackName}</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] text-xs space-y-1">
                    <div><strong>Conferred To:</strong> {cert.recipientName}</div>
                    <div><strong>Certificate Number:</strong> <span className="font-mono text-[#855B09]">{cert.certificateNumber}</span></div>
                    <div><strong>Issue Date:</strong> {cert.issueDate} ({cert.issueDateAm})</div>
                    <div className="text-[11px] text-[#6B7280]"><strong>Endorsed By:</strong> {cert.endorsedBy}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E6DFD1] flex gap-3">
                  <button
                    onClick={() => handleDownloadCert(cert)}
                    className="flex-1 btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Certificate</span>
                  </button>
                  <button
                    onClick={() => setShowCertificateModal(cert)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] text-xs font-bold text-[#2C1D07]"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 5. LIVE WEBINARS VIEW ══════════════════════════════════ */}
      {currentSection === 'webinars' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">LIVE THEOLOGICAL Q&A</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Tv className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'የቀጥታ ስርጭት ስብከቶችና የጥያቄና መልስ መድረኮች' : 'Scheduled Live Webinars & Clergy Q&A'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Join live interactive Zoom/YouTube streams with leading scholars, archbishops, and apologists of the Holy Synod.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_WEBINARS.map((web) => (
              <div
                key={web.id}
                className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-48 w-full">
                  <img src={web.image} alt={web.titleEn} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Tv className="w-3 h-3" /> LIVE STREAM
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-base font-bold font-geez">{web.titleAm}</h4>
                    <p className="text-xs text-stone-200">{web.titleEn}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] space-y-1.5 text-xs text-[#4A3B22]">
                    <div><strong>Speaker:</strong> {web.speaker}</div>
                    <div className="text-[11px] text-[#855B09]">{web.speakerTitle}</div>
                    <div className="text-[11px] text-[#6B7280]">📅 {web.dateGregorian} ({web.dateEthiopian})</div>
                    <div className="text-[11px] text-[#6B7280]">⏰ {web.time}</div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex gap-2">
                    <a
                      href={web.zoomUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Zoom Stream</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 6. INTERACTIVE LESSON PLAYER & QUIZ MODAL ══════════════ */}
      {activeCourse && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveCourse(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-4xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white flex items-center justify-between">
              <div>
                <span className="badge-gold text-[9px] uppercase font-bold">COURSE LESSON PLAYER</span>
                <h3 className="text-xl font-bold font-geez text-white">{activeCourse.titleAm}</h3>
                <p className="text-xs text-[#C8A84B]">{activeCourse.titleEn}</p>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4A3B22]">
              {/* Video Player Box */}
              {activeLesson && (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-[#E6DFD1]">
                    <video
                      controls
                      src={activeLesson.videoUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-bold text-[#2C1D07] font-geez">{activeLesson.titleAm}</h4>
                      <span className="text-xs font-mono text-[#855B09]">{activeLesson.duration}</span>
                    </div>
                    <p className="text-xs text-[#855B09] font-medium">{activeLesson.titleEn}</p>
                    <p className="text-xs text-[#4A3B22] leading-relaxed mt-2 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1]">
                      {activeLesson.summaryEn}
                    </p>
                  </div>

                  {/* Interactive Lesson Quiz */}
                  {activeLesson.quiz && (
                    <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FAF8F3] p-6 rounded-2xl border-2 border-[#C8A84B] space-y-4">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-[#855B09]" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#855B09]">
                          Lesson Comprehension Assessment (የምዕራፉ ጥያቄ)
                        </span>
                      </div>

                      <div className="font-bold text-sm text-[#2C1D07]">
                        {activeLesson.quiz.question}
                      </div>

                      <form onSubmit={handleQuizSubmit} className="space-y-3">
                        <div className="space-y-2">
                          {activeLesson.quiz.options.map((opt, i) => (
                            <label
                              key={i}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                quizSelectedOption === i
                                  ? 'bg-[#1A2C1C] text-[#C8A84B] border-[#C8A84B] font-bold'
                                  : 'bg-white border-[#E6DFD1] text-[#2C1D07]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="quizOpt"
                                checked={quizSelectedOption === i}
                                onChange={() => setQuizSelectedOption(i)}
                                className="hidden"
                              />
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>

                        {quizSubmitted && (
                          <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                            quizSelectedOption === activeLesson.quiz.correctIndex
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-red-100 text-red-800 border border-red-300'
                          }`}>
                            {quizSelectedOption === activeLesson.quiz.correctIndex ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                <span>Correct! {activeLesson.quiz.explanation}</span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 text-red-600 shrink-0" />
                                <span>Incorrect. Try again! {activeLesson.quiz.explanation}</span>
                              </>
                            )}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="btn-gold py-2.5 px-6 text-xs font-bold shadow-sm"
                        >
                          Submit Answer
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Lesson Playlist */}
              <div className="space-y-3 pt-4 border-t border-[#E6DFD1]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#855B09]">All Course Lessons</h4>
                <div className="space-y-2">
                  {activeCourse.lessons.map((lsn, idx) => (
                    <div
                      key={lsn.id}
                      onClick={() => {
                        setActiveLesson(lsn);
                        setQuizSelectedOption(null);
                        setQuizSubmitted(false);
                      }}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        activeLesson?.id === lsn.id
                          ? 'bg-[#FFF8E7] border-[#C8A84B] font-bold text-[#855B09]'
                          : 'bg-[#FAF8F3] border-[#E6DFD1] text-[#2C1D07] hover:border-[#C8A84B]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          activeLesson?.id === lsn.id ? 'bg-[#C8A84B] text-[#1A2C1C]' : 'bg-white text-[#6B7280] border border-[#E6DFD1]'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-geez">{lsn.titleAm}</div>
                          <div className="text-[11px] text-[#6B7280]">{lsn.titleEn}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono">{lsn.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ 7. CERTIFICATE PREVIEW MODAL ═══════════════════════════ */}
      {showCertificateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCertificateModal(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-[#C8A84B] shadow-2xl p-8 space-y-6 text-center animate-scaleUp relative">
            <button
              onClick={() => setShowCertificateModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F3] hover:bg-[#E6DFD1] text-[#2C1D07] flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="space-y-2">
              <Award className="w-14 h-14 text-[#C8A84B] mx-auto" />
              <span className="badge-gold text-[10px] uppercase font-bold tracking-widest">
                HOLY SYNOD OF ETHIOPIA & MAHIBERE KIDUSAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">የምስክር ወረቀት (Certificate of Completion)</h2>
            </div>

            <div className="space-y-3 py-4 border-y border-[#E6DFD1]">
              <p className="text-xs text-[#6B7280] uppercase tracking-wider">This is proudly awarded to</p>
              <div className="text-2xl font-black text-[#855B09] font-serif">{showCertificateModal.recipientName}</div>
              <p className="text-xs text-[#4A3B22]">for successfully mastering the curriculum of</p>
              <div className="text-lg font-bold text-[#2C1D07] font-geez">{showCertificateModal.courseTitleAm}</div>
              <div className="text-xs font-semibold text-[#855B09]">{showCertificateModal.courseTitleEn}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left text-xs bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1]">
              <div><strong>Certificate ID:</strong> {showCertificateModal.certificateNumber}</div>
              <div><strong>Final Grade:</strong> {showCertificateModal.grade}</div>
              <div><strong>Date Issued:</strong> {showCertificateModal.issueDate}</div>
              <div><strong>Endorsement:</strong> {showCertificateModal.endorsedBy}</div>
            </div>

            <button
              onClick={() => handleDownloadCert(showCertificateModal)}
              className="btn-gold w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Printable Diploma</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
