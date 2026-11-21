import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getCareersPath(): string {
  const candidates = [
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'live-careers.json'),
    path.resolve(process.cwd(), 'src', 'data', 'live-careers.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'live-careers.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\live-careers.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function readCareersData() {
  const p = getCareersPath();
  if (!fs.existsSync(p)) {
    return { version: '1.0.0', lastUpdated: new Date().toISOString(), jobs: [], applicants: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch (e) {
    return { version: '1.0.0', lastUpdated: new Date().toISOString(), jobs: [], applicants: [] };
  }
}

function writeCareersData(data: any) {
  const p = getCareersPath();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: Returns all jobs and applicants for Admin & Branch Managers
export async function GET() {
  try {
    const data = readCareersData();
    return NextResponse.json({
      success: true,
      lastUpdated: data.lastUpdated,
      jobs: data.jobs || [],
      applicants: data.applicants || [],
      totalJobs: data.jobs?.length || 0,
      totalApplicants: data.applicants?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create new job opening from Admin Dashboard
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = readCareersData();
    if (!Array.isArray(data.jobs)) data.jobs = [];

    const {
      title,
      titleBn,
      department,
      branch,
      location,
      type,
      salary,
      experience,
      deadline,
      vacancies,
      description,
      responsibilities,
      requirements,
      benefits,
    } = body;

    if (!title?.trim() || !department?.trim() || !branch?.trim()) {
      return NextResponse.json(
        { error: 'Title, department, and branch are required.' },
        { status: 400 }
      );
    }

    const jobId = `job-eco-${Date.now().toString(36)}`;
    const newJob = {
      id: jobId,
      title: title.trim(),
      titleBn: titleBn?.trim() || title.trim(),
      department: department.trim(),
      branch: branch.trim(),
      location: location?.trim() || 'Dhaka Metropolitan Region',
      type: type || 'Full-time',
      salary: salary?.trim() || 'Negotiable',
      experience: experience?.trim() || 'Experience preferred',
      deadline: deadline?.trim() || 'Open until filled',
      vacancies: Number(vacancies) || 1,
      status: 'ACTIVE',
      description: description?.trim() || 'Join our vibrant supermarket operations team.',
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities.filter(Boolean)
        : typeof responsibilities === 'string'
        ? responsibilities.split('\n').filter(Boolean)
        : [],
      requirements: Array.isArray(requirements)
        ? requirements.filter(Boolean)
        : typeof requirements === 'string'
        ? requirements.split('\n').filter(Boolean)
        : [],
      benefits: Array.isArray(benefits)
        ? benefits.filter(Boolean)
        : typeof benefits === 'string'
        ? benefits.split('\n').filter(Boolean)
        : ['Festival Bonuses', 'Staff Discounts', 'Medical Coverage'],
      postedAt: new Date().toISOString(),
    };

    data.jobs.unshift(newJob);
    writeCareersData(data);

    return NextResponse.json({
      success: true,
      message: 'Job posting created successfully.',
      job: newJob,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update job or applicant
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { target, id, status, notes, jobData } = body;
    const data = readCareersData();

    if (target === 'applicant') {
      const applicant = data.applicants?.find((a: any) => a.id === id);
      if (!applicant) {
        return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
      }
      if (status) applicant.status = status;
      if (typeof notes === 'string') applicant.notes = notes;
      writeCareersData(data);
      return NextResponse.json({ success: true, applicant });
    }

    if (target === 'job') {
      const job = data.jobs?.find((j: any) => j.id === id);
      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }
      if (status) job.status = status;
      if (jobData) {
        Object.assign(job, jobData);
      }
      writeCareersData(data);
      return NextResponse.json({ success: true, job });
    }

    return NextResponse.json({ error: 'Target must be "applicant" or "job".' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove job or applicant
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('target');
    const id = searchParams.get('id');

    if (!id || !target) {
      return NextResponse.json({ error: 'id and target are required.' }, { status: 400 });
    }

    const data = readCareersData();
    if (target === 'job') {
      data.jobs = (data.jobs || []).filter((j: any) => j.id !== id);
      writeCareersData(data);
      return NextResponse.json({ success: true, message: 'Job deleted' });
    }

    if (target === 'applicant') {
      data.applicants = (data.applicants || []).filter((a: any) => a.id !== id);
      writeCareersData(data);
      return NextResponse.json({ success: true, message: 'Applicant removed' });
    }

    return NextResponse.json({ error: 'Invalid target' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
