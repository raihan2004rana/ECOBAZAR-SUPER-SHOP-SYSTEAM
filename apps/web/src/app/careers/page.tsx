'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  Users,
  ChevronRight,
  ChevronDown,
  X,
  Send,
  Mail,
  Phone,
  FileText,
  HeartHandshake,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { useLanguage } from '../../context/language-context';
import { useToast } from '@ecobazar/ui';

interface JobOpening {
  id: string;
  title: string;
  titleBn?: string;
  department: string;
  branch: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  deadline: string;
  vacancies: number;
  status: 'ACTIVE' | 'CLOSED';
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
}

export default function CareersPage() {
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const [jobs, setJobs] = React.useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedDept, setSelectedDept] = React.useState<string>('all');
  const [selectedBranch, setSelectedBranch] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Expanded job details modal / accordion
  const [viewingJob, setViewingJob] = React.useState<JobOpening | null>(null);

  // Application Modal state
  const [applyingJob, setApplyingJob] = React.useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = React.useState('');
  const [applicantEmail, setApplicantEmail] = React.useState('');
  const [applicantPhone, setApplicantPhone] = React.useState('');
  const [branchPref, setBranchPref] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [expectedSalary, setExpectedSalary] = React.useState('');
  const [resumeUrl, setResumeUrl] = React.useState('');
  const [coverLetter, setCoverLetter] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedApplication, setSubmittedApplication] = React.useState<any>(null);

  // Fetch live jobs
  const fetchJobs = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/careers?scope=public');
      const data = await res.json();
      if (data.success && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed to load careers:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Unique departments for filter
  const departments = React.useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.department));
    return ['all', ...Array.from(set)];
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = React.useMemo(() => {
    return jobs.filter((j) => {
      const matchDept = selectedDept === 'all' || j.department === selectedDept;
      const matchBranch = selectedBranch === 'all' || j.branch.toLowerCase().includes(selectedBranch.toLowerCase());
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        (j.titleBn && j.titleBn.toLowerCase().includes(q)) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      return matchDept && matchBranch && matchSearch;
    });
  }, [jobs, selectedDept, selectedBranch, searchQuery]);

  // Open apply modal
  const handleOpenApply = (job: JobOpening) => {
    setApplyingJob(job);
    setBranchPref(job.branch);
    setSubmittedApplication(null);
  };

  // Submit Job Application
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) {
      toast.error('Missing Required Fields', 'Please provide your full name, email address, and phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'apply',
          jobId: applyingJob?.id,
          jobTitle: applyingJob?.title,
          applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          branchPreference: branchPref || applyingJob?.branch,
          experience,
          expectedSalary,
          resumeUrl,
          coverLetter,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSubmittedApplication(result);
        toast.success(
          'Application Submitted!',
          `Reference #${result.applicationId}. Confirmation email sent to ${applicantEmail}.`
        );
      } else {
        toast.error('Submission Failed', result.error || 'Please try again later.');
      }
    } catch (err: any) {
      toast.error('Submission Error', err.message || 'Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      {/* Site Header */}
      <SiteHeader />

      <main className="flex-1 pb-20">
        {/* ==================================================== */}
        {/* 1. HERO BANNER: CAREER AT ECOBAZAR                    */}
        {/* ==================================================== */}
        <section className="relative bg-[#123C2D] text-white py-14 sm:py-20 overflow-hidden">
          {/* Subtle geometric pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2EBD70_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#21A366]/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21A366]/20 border border-[#21A366]/40 text-[#2EBD70] text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("We're Hiring • Join Our Team", 'আমরা নিয়োগ দিচ্ছি • আমাদের টিমে যোগ দিন')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {t('Build Your Future With ECOBAZAR', 'গড়ে তুলুন আপনার উজ্জ্বল ভবিষ্যৎ ECOBAZAR-এ')}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                {t(
                  "Bangladesh's leading technology-driven organic supermarket chain. We offer competitive salaries, health coverage, staff grocery benefits, and rapid leadership growth.",
                  'বাংলাদেশের অন্যতম দ্রুত বর্ধনশীল আধুনিক অর্গানিক সুপারশপ চেইন। আকর্ষণীয় বেতন, চিকিৎসা বীমা, উৎসব বোনাস ও স্টাফ গ্রোসারি ডিসকাউন্টের সাথে গড়ে তুলুন আপনার সফল রিটেইল ও সাপ্লাই চেইন ক্যারিয়ার।'
                )}
              </p>

              {/* High-Impact Stat Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-white/15">
                <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-[#2EBD70]">3+</p>
                  <p className="text-xs text-emerald-100 font-semibold mt-0.5">{t('Superstore Hubs', 'ফ্ল্যাগশিপ সুপারস্টোর')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-[#2EBD70]">250+</p>
                  <p className="text-xs text-emerald-100 font-semibold mt-0.5">{t('Team Members', 'নিবেদিত টিম মেম্বার')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-[#2EBD70]">100%</p>
                  <p className="text-xs text-emerald-100 font-semibold mt-0.5">{t('Cold-Chain Safe', 'নিরাপদ ফুড সেফটি')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-[#2EBD70]">15%</p>
                  <p className="text-xs text-emerald-100 font-semibold mt-0.5">{t('Staff Discount', 'স্টাফ গ্রোসারি ছাড়')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* 2. WHY WORK WITH US: CULTURE & PERKS                 */}
        {/* ==================================================== */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#17251F]">
              {t('Why You Will Love Working At ECOBAZAR', 'ইকোবাজারে কাজ করার সেরা সুবিধাগুলো')}
            </h2>
            <p className="text-xs sm:text-sm text-[#64736B] mt-2">
              {t(
                'We believe great customer service begins with a caring, rewarding, and empowered employee workplace.',
                'আমরা বিশ্বাস করি একটি সন্তুষ্ট টিমই গ্রাহকদের সেরা সুপারশপ অভিজ্ঞতা উপহার দিতে পারে।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5ECE7] shadow-xs flex items-start gap-4 hover:border-[#21A366] transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#17251F]">
                  {t('Competitive Pay & Bonuses', 'আকর্ষণীয় বেতন ও উৎসব বোনাস')}
                </h3>
                <p className="text-xs text-[#64736B] mt-1 leading-relaxed">
                  {t('Market-leading base salaries, 2 festival bonuses annually, and monthly sales performance incentives.', 'মার্কেট-কম্পিটিটিভ বেতন কাঠামো, বছরে ২টি উৎসব বোনাস এবং মাসিক সেলস ইনসেনটিভ।')}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5ECE7] shadow-xs flex items-start gap-4 hover:border-[#21A366] transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#17251F]">
                  {t('Health & Accident Coverage', 'স্বাস্থ্য ও জীবন সুরক্ষা')}
                </h3>
                <p className="text-xs text-[#64736B] mt-1 leading-relaxed">
                  {t('Comprehensive corporate health insurance, accidental coverage for riders, and paid medical leave.', 'ফুল-টাইম কর্মীদের জন্য হেলথ ইন্স্যুরেন্স, রাইডারদের দুর্ঘটনা কভারেজ ও পেইড মেডিকেল লিভ।')}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5ECE7] shadow-xs flex items-start gap-4 hover:border-[#21A366] transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <Percent className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#17251F]">
                  {t('Staff Grocery Privilege', 'স্টাফ গ্রোসারি বিশেষ ছাড়')}
                </h3>
                <p className="text-xs text-[#64736B] mt-1 leading-relaxed">
                  {t('15% flat discount on 100% organic groceries, fresh meats, dairy, and farm produce for your family.', 'নিজের ও পরিবারের জন্য তাজা ফসল, খাঁটি তেল, মাংস ও দুধে ফ্ল্যাট ১৫% স্পেশাল স্টাফ ডিসকাউন্ট।')}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5ECE7] shadow-xs flex items-start gap-4 hover:border-[#21A366] transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#17251F]">
                  {t('Fast-Track Career Growth', 'দ্রুত পদোন্নতির সুযোগ')}
                </h3>
                <p className="text-xs text-[#64736B] mt-1 leading-relaxed">
                  {t('Over 65% of our store supervisors and branch managers started as frontline associates.', 'আমাদের ব্রাঞ্চ ম্যানেজার ও সুপারভাইজারদের ৬৫% ফ্রন্টলাইন থেকে পদোন্নতি পেয়ে দায়িত্ব গ্রহণ করেছেন।')}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5ECE7] shadow-xs flex items-start gap-4 hover:border-[#21A366] transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#17251F]">
                  {t('Multiple Dhaka Hubs', 'ঢাকার ৩টি প্রাইম ব্রাঞ্চ হাব')}
                </h3>
                <p className="text-xs text-[#64736B] mt-1 leading-relaxed">
                  {t('Choose your workplace between Gulshan-2, Dhanmondi Road 27, and Uttara Sector 11 for convenient commute.', 'আপনার বাসার সুবিধাজনক দূরত্বে গুলশান, ধানমন্ডি বা উত্তরা ব্রাঞ্চ বেছে নেওয়ার সুবিধা।')}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5ECE7] shadow-xs flex items-start gap-4 hover:border-[#21A366] transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#17251F]">
                  {t('Friendly & Respectful Team', 'মর্যাদাপূর্ণ ও বন্ধুত্বপূর্ণ পরিবেশ')}
                </h3>
                <p className="text-xs text-[#64736B] mt-1 leading-relaxed">
                  {t('Equal opportunities, supportive team leaders, modern air-conditioned stores, and a warm family spirit.', 'সমমর্যাদা, আধুনিক শীতাতপ নিয়ন্ত্রিত স্টোর এবং একটি ইতিবাচক ও সহযোগিতাপূর্ণ কাজের পরিবেশ।')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* 3. OPEN POSITIONS & FILTER SEARCH                     */}
        {/* ==================================================== */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-8 shadow-xs">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5ECE7]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#D8F3DC] text-[#21A366]">
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">
                    {t('Current Job Openings', 'চলতি নিয়োগ বিজ্ঞপ্তি সমূহ')}
                  </h2>
                </div>
                <p className="text-xs text-[#64736B] mt-1">
                  {t(
                    `Explore ${filteredJobs.length} active positions across our retail stores, logistics, and management hubs.`,
                    `আমাদের রিটেইল সুপারস্টোর, লজিস্টিকস ও ম্যানেজমেন্টে ${filteredJobs.length} টি সক্রিয় পদের বিজ্ঞপ্তি দেখুন।`
                  )}
                </p>
              </div>

              {/* Live counter pill */}
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#EBF7F0] border border-[#21A366]/30 text-xs font-black text-[#123C2D]">
                  ● {filteredJobs.length} {t('Jobs Active', 'টি পদে আবেদন চলছে')}
                </span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-5 border-b border-[#E5ECE7]">
              {/* Search Keyword */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('Search positions, keywords...', 'পদের নাম বা পদবি দিয়ে খুঁজুন...')}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#F7F9F5] focus:bg-white focus:outline-hidden focus:border-[#21A366] transition-all font-medium text-[#17251F]"
                />
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#F7F9F5] focus:bg-white focus:outline-hidden focus:border-[#21A366] transition-all font-medium text-[#17251F]"
                >
                  <option value="all">{t('All Departments (সকল বিভাগ)', 'সকল বিভাগ')}</option>
                  {departments
                    .filter((d) => d !== 'all')
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Branch Filter */}
              <div>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#F7F9F5] focus:bg-white focus:outline-hidden focus:border-[#21A366] transition-all font-medium text-[#17251F]"
                >
                  <option value="all">{t('All Branches (সকল ব্রাঞ্চ হাব)', 'সকল ব্রাঞ্চ হাব')}</option>
                  <option value="Gulshan">{t('Gulshan-2 Superstore #02', 'গুলশান-২ সুপারস্টোর #০২')}</option>
                  <option value="Dhanmondi">{t('Dhanmondi Flagship #01', 'ধানমন্ডি ফ্ল্যাগশিপ #০১')}</option>
                  <option value="Uttara">{t('Uttara Sector 11 #03', 'উত্তরা সেক্টর ১১ #০৩')}</option>
                </select>
              </div>
            </div>

            {/* Job Listings Grid */}
            <div className="pt-6">
              {isLoading ? (
                <div className="py-16 text-center text-sm font-bold text-[#64736B]">
                  {t('Loading career opportunities...', 'নিয়োগ বিজ্ঞপ্তিগুলো লোড হচ্ছে...')}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="py-16 text-center max-w-md mx-auto">
                  <div className="w-12 h-12 rounded-full bg-[#F7F9F5] text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-[#17251F] text-base">
                    {t('No Jobs Found', 'কোনো বিজ্ঞপ্তি পাওয়া যায়নি')}
                  </h3>
                  <p className="text-xs text-[#64736B] mt-1">
                    {t('Try adjusting your search criteria or department filter.', 'অনুগ্রহ করে ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।')}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDept('all');
                      setSelectedBranch('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-xs font-black text-[#21A366] hover:underline cursor-pointer"
                  >
                    {t('Clear Filters', 'সকল ফিল্টার রিসেট করুন')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="group bg-[#FAFBF9] hover:bg-white rounded-2xl border border-[#E5ECE7] hover:border-[#21A366] p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-md"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Title & Metadata */}
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#21A366]/15 text-[#123C2D]">
                              {job.department}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-200 text-neutral-800">
                              {job.type}
                            </span>
                            <span className="text-[11px] text-rose-600 font-extrabold ml-auto lg:ml-0">
                              {t('Deadline: ', 'আবেদনের শেষ তারিখ: ')} {job.deadline}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-black text-[#17251F] group-hover:text-[#21A366] transition-colors">
                            {job.title}
                          </h3>

                          {job.titleBn && (
                            <p className="text-xs font-bold text-[#21A366] font-bangla -mt-1">{job.titleBn}</p>
                          )}

                          <p className="text-xs text-[#64736B] line-clamp-2 leading-relaxed">{job.description}</p>

                          {/* Quick Badges Row */}
                          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#4B5563]">
                            <div className="flex items-center gap-1.5 font-bold text-[#17251F]">
                              <MapPin className="w-3.5 h-3.5 text-[#21A366] shrink-0" />
                              <span>{job.branch}</span>
                            </div>
                            <span className="text-neutral-300">•</span>
                            <div className="flex items-center gap-1.5 font-bold text-[#D9531E]">
                              <DollarSign className="w-3.5 h-3.5 text-[#D9531E] shrink-0" />
                              <span>{job.salary}</span>
                            </div>
                            <span className="text-neutral-300">•</span>
                            <div className="flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-[#21A366] shrink-0" />
                              <span>{job.experience}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E5ECE7]">
                          <button
                            type="button"
                            onClick={() => setViewingJob(job)}
                            className="px-4 py-2.5 rounded-xl border border-[#E5ECE7] hover:border-gray-400 bg-white text-xs font-bold text-[#17251F] hover:bg-gray-50 transition-all cursor-pointer"
                          >
                            {t('View Details', 'বিস্তারিত দেখুন')}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenApply(job)}
                            className="px-5 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{t('Apply Now', 'আবেদন করুন')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================== */}
      {/* 4. VIEW JOB DETAILS MODAL                            */}
      {/* ==================================================== */}
      {viewingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5ECE7] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5ECE7] p-5 sm:p-6 flex items-start justify-between gap-4 z-10">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#21A366]/15 text-[#123C2D]">
                  {viewingJob.department}
                </span>
                <h3 className="text-xl font-black text-[#17251F] mt-1">{viewingJob.title}</h3>
                <p className="text-xs text-[#64736B] mt-0.5">{viewingJob.branch} • {viewingJob.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingJob(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm text-[#4B5563]">
              {/* Highlight summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7]">
                <div>
                  <span className="text-[11px] text-[#64736B] block">বেতন কাঠামো:</span>
                  <span className="font-extrabold text-[#D9531E]">{viewingJob.salary}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#64736B] block">কাজের ধরণ:</span>
                  <span className="font-extrabold text-[#17251F]">{viewingJob.type}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#64736B] block">আবেদনের শেষ তারিখ:</span>
                  <span className="font-extrabold text-rose-600">{viewingJob.deadline}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-black text-sm text-[#17251F] mb-1.5 uppercase tracking-wide">কাজের বিবরণ (Overview)</h4>
                <p className="leading-relaxed">{viewingJob.description}</p>
              </div>

              {/* Responsibilities */}
              {viewingJob.responsibilities && viewingJob.responsibilities.length > 0 && (
                <div>
                  <h4 className="font-black text-sm text-[#17251F] mb-2 uppercase tracking-wide">মূল দায়িত্বসমূহ (Responsibilities)</h4>
                  <ul className="space-y-1.5">
                    {viewingJob.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {viewingJob.requirements && viewingJob.requirements.length > 0 && (
                <div>
                  <h4 className="font-black text-sm text-[#17251F] mb-2 uppercase tracking-wide">প্রয়োজনীয় যোগ্যতা (Requirements)</h4>
                  <ul className="space-y-1.5">
                    {viewingJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {viewingJob.benefits && viewingJob.benefits.length > 0 && (
                <div>
                  <h4 className="font-black text-sm text-[#17251F] mb-2 uppercase tracking-wide">কোম্পানি সুযোগ-সুবিধা (Perks & Benefits)</h4>
                  <ul className="space-y-1.5">
                    {viewingJob.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-[#F4A340] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-[#E5ECE7] p-4 sm:p-5 flex items-center justify-end gap-3 z-10">
              <button
                type="button"
                onClick={() => setViewingJob(null)}
                className="px-4 py-2.5 rounded-xl border border-[#E5ECE7] text-xs font-bold text-[#17251F] hover:bg-neutral-50"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = viewingJob;
                  setViewingJob(null);
                  handleOpenApply(target);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-black shadow-md flex items-center gap-1.5"
              >
                <span>এই পদে আবেদন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. JOB APPLICATION MODAL WITH EMAIL NOTIFICATION     */}
      {/* ==================================================== */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E5ECE7] max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#123C2D] text-white p-5 sm:p-6 flex items-start justify-between gap-4 z-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2EBD70]">
                  {t('Job Application', 'চাকরির আবেদন পত্র')}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">{applyingJob.title}</h3>
                <p className="text-xs text-emerald-100/80">{applyingJob.branch}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setApplyingJob(null);
                  setSubmittedApplication(null);
                }}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If application submitted successfully */}
            {submittedApplication ? (
              <div className="p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D8F3DC] text-[#21A366] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#123C2D]">
                  {t('Application Submitted Successfully!', 'আবেদন সফলভাবে গৃহীত হয়েছে!')}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                  {t(
                    `Thank you, ${applicantName}. Your application for ${applyingJob.title} has been logged in our system.`,
                    `ধন্যবাদ, ${applicantName}! ${applyingJob.title} পদে আপনার আবেদনটি আমাদের সেন্ট্রাল ডেটাবেজে সংরক্ষিত হয়েছে।`
                  )}
                </p>

                {/* Email Confirmation Notice Box */}
                <div className="bg-[#F2FBF6] border border-[#C4EED6] rounded-2xl p-4 text-left text-xs text-[#123C2D] space-y-1.5 max-w-md mx-auto">
                  <div className="flex items-center gap-2 font-black text-sm">
                    <Mail className="w-4 h-4 text-[#21A366]" />
                    <span>কনফার্মেশন ইমেইল পাঠানো হয়েছে!</span>
                  </div>
                  <p className="text-[#4B5563]">
                    আপনার প্রদত্ত ইমেইল <strong>{applicantEmail}</strong>-এ আবেদন নম্বর <strong>#{submittedApplication.applicationId}</strong> সহ বিস্তারিত মেমো পাঠিয়ে দেওয়া হয়েছে।
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setApplyingJob(null);
                      setSubmittedApplication(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-black shadow-md transition-all cursor-pointer"
                  >
                    {t('Close & Continue', 'সম্পন্ন করুন')}
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleSubmitApplication} className="p-5 sm:p-6 space-y-4">
                {/* Notice */}
                <div className="p-3 bg-[#EBF7F0] rounded-xl border border-[#21A366]/30 text-xs text-[#123C2D] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#21A366] shrink-0" />
                  <span>আবেদন সম্পন্ন হওয়া মাত্র আপনার ইমেইলে কনফার্মেশন নোটিফিকেশন পৌঁছে যাবে।</span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      {t('Full Name (পূর্ণ নাম)', 'পূর্ণ নাম')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Mohammad Rahim"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      {t('Phone Number (মোবাইল নম্বর)', 'মোবাইল নম্বর')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+880 1712-345678"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-xs font-bold text-[#17251F] block mb-1">
                    {t('Email Address (ইমেইল এড্রেস - নোটিফিকেশনের জন্য)', 'ইমেইল এড্রেস (নোটিফিকেশন যাবে)')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="e.g. rahim@example.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                  />
                </div>

                {/* Branch Preference & Expected Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      {t('Branch Preference (পছন্দের ব্রাঞ্চ)', 'পছন্দের ব্রাঞ্চ')}
                    </label>
                    <select
                      value={branchPref}
                      onChange={(e) => setBranchPref(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] bg-white focus:outline-hidden focus:border-[#21A366] font-medium"
                    >
                      <option value="Gulshan-2 Superstore #02">গুলশান-২ সুপারস্টোর #০২</option>
                      <option value="Dhanmondi Branch #01 (Flagship)">ধানমন্ডি ফ্ল্যাগশিপ ব্রাঞ্চ #০১</option>
                      <option value="Uttara Sector 11 Express #03">উত্তরা সেক্টর ১১ এক্সপ্রেস #০৩</option>
                      <option value="All Branches (Any Branch in Dhaka)">যেকোনো ব্রাঞ্চ (ঢাকা মেট্রো)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      {t('Expected Salary (প্রত্যাশিত বেতন)', 'প্রত্যাশিত বেতন')}
                    </label>
                    <input
                      type="text"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="e.g. ৳৩৫,০০০"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                    />
                  </div>
                </div>

                {/* Experience & Resume Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      {t('Work Experience (পূর্ব অভিজ্ঞতা)', 'পূর্ব অভিজ্ঞতা')}
                    </label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. ২ বছর (সুপারশপ সেলস বা ক্যাশিয়ার)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      {t('Resume / Portfolio Link (সিভি লিংক)', 'সিভি লিংক (Google Drive / LinkedIn)')}
                    </label>
                    <input
                      type="url"
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      placeholder="https://drive.google.com/... or portfolio"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                    />
                  </div>
                </div>

                {/* Cover letter / message */}
                <div>
                  <label className="text-xs font-bold text-[#17251F] block mb-1">
                    {t('Why do you want to join ECOBAZAR? (সংক্ষিপ্ত বার্তা)', 'সংক্ষিপ্ত বার্তা (ঐচ্ছিক)')}
                  </label>
                  <textarea
                    rows={3}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell us briefly about your strengths and enthusiasm..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] font-medium"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#E5ECE7] text-xs font-bold text-gray-700 hover:bg-neutral-50"
                  >
                    {t('Cancel', 'বাতিল')}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-black shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t('Submitting...', 'জমা হচ্ছে...')}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t('Submit Application', 'আবেদন জমা দিন')}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
