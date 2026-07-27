export interface VisitLog {
  id: string;
  timestamp: string;
  ipMasked: string;
  location: string;
  device: string;
  source: string;
  section: string;
  durationSeconds: number;
}

export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  conversions: number;
  avgDurationSeconds: number;
  bounceRate: number;
  sources: { name: string; percentage: number; count: number }[];
  countries: { country: string; code: string; visits: number; percentage: number }[];
  devices: { device: string; percentage: number }[];
  sectionViews: { section: string; views: number }[];
  dailyTraffic: { date: string; views: number; uniques: number }[];
  logs: VisitLog[];
}

const ANALYTICS_STORAGE_KEY = 'ali_portfolio_analytics_v1';
const VISITOR_ID_KEY = 'ali_portfolio_visitor_id';

const DEFAULT_ANALYTICS: AnalyticsData = {
  totalViews: 1428,
  uniqueVisitors: 892,
  conversions: 37,
  avgDurationSeconds: 164,
  bounceRate: 24.5,
  sources: [
    { name: 'Direct / Bookmark', percentage: 42, count: 600 },
    { name: 'LinkedIn Profile', percentage: 28, count: 400 },
    { name: 'Google Search', percentage: 16, count: 228 },
    { name: 'GitHub Repositories', percentage: 9, count: 128 },
    { name: 'Fiverr / Client Direct', percentage: 5, count: 72 },
  ],
  countries: [
    { country: 'United States', code: 'US', visits: 540, percentage: 38 },
    { country: 'United Kingdom', code: 'GB', visits: 215, percentage: 15 },
    { country: 'Germany', code: 'DE', visits: 172, percentage: 12 },
    { country: 'Pakistan', code: 'PK', visits: 157, percentage: 11 },
    { country: 'United Arab Emirates', code: 'AE', visits: 128, percentage: 9 },
    { country: 'Canada', code: 'CA', visits: 116, percentage: 8 },
    { country: 'Others', code: 'GLOBAL', visits: 100, percentage: 7 },
  ],
  devices: [
    { device: 'Desktop (macOS / Windows)', percentage: 68 },
    { device: 'Mobile (iOS / Android)', percentage: 27 },
    { device: 'Tablet (iPadOS / Surface)', percentage: 5 },
  ],
  sectionViews: [
    { section: 'Hero & Agent Demo', views: 1428 },
    { section: 'Services & Architecture', views: 1120 },
    { section: 'Featured Projects', views: 980 },
    { section: 'Pricing & Packages', views: 640 },
    { section: 'Experience & Skills', views: 520 },
    { section: 'Contact & Hire Me', views: 410 },
  ],
  dailyTraffic: [
    { date: 'Mon', views: 180, uniques: 120 },
    { date: 'Tue', views: 220, uniques: 145 },
    { date: 'Wed', views: 290, uniques: 190 },
    { date: 'Thu', views: 240, uniques: 160 },
    { date: 'Fri', views: 310, uniques: 210 },
    { date: 'Sat', views: 195, uniques: 130 },
    { date: 'Sun (Today)', views: 215, uniques: 142 },
  ],
  logs: [
    {
      id: 'log-101',
      timestamp: '2 mins ago',
      ipMasked: '192.168.1.***',
      location: 'San Francisco, CA, USA',
      device: 'Macintosh (Chrome 124)',
      source: 'LinkedIn Profile',
      section: 'Pricing & Packages',
      durationSeconds: 210,
    },
    {
      id: 'log-102',
      timestamp: '14 mins ago',
      ipMasked: '86.104.22.***',
      location: 'London, UK',
      device: 'iPhone 15 Pro (Safari)',
      source: 'Direct / Bookmark',
      section: 'Featured Projects',
      durationSeconds: 145,
    },
    {
      id: 'log-103',
      timestamp: '38 mins ago',
      ipMasked: '185.220.101.***',
      location: 'Berlin, Germany',
      device: 'Windows 11 (Firefox)',
      source: 'Google Search',
      section: 'Services & Architecture',
      durationSeconds: 320,
    },
    {
      id: 'log-104',
      timestamp: '1 hour ago',
      ipMasked: '111.92.188.***',
      location: 'Dubai, UAE',
      device: 'Macintosh (Safari)',
      source: 'Fiverr / Client Direct',
      section: 'Hero & Agent Demo',
      durationSeconds: 180,
    },
    {
      id: 'log-105',
      timestamp: '2 hours ago',
      ipMasked: '39.44.120.***',
      location: 'Lahore, Pakistan',
      device: 'Windows 10 (Chrome)',
      source: 'GitHub Repositories',
      section: 'Contact & Hire Me',
      durationSeconds: 260,
    },
  ],
};

export const getStoredAnalytics = (): AnalyticsData => {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
      return DEFAULT_ANALYTICS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_ANALYTICS;
  }
};

export const recordPageView = (section: string = 'Hero & Agent Demo') => {
  try {
    const data = getStoredAnalytics();
    data.totalViews += 1;

    let isUnique = false;
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = 'v_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
      data.uniqueVisitors += 1;
      isUnique = true;
    }

    // Update section view
    const secObj = data.sectionViews.find((s) => s.section.toLowerCase().includes(section.toLowerCase()));
    if (secObj) {
      secObj.views += 1;
    }

    // Add new visit log
    const userAgent = navigator.userAgent;
    let deviceName = 'Desktop Browser';
    if (/iPhone|iPad|iPod/i.test(userAgent)) deviceName = 'iOS Mobile';
    else if (/Android/i.test(userAgent)) deviceName = 'Android Mobile';
    else if (/Macintosh/i.test(userAgent)) deviceName = 'Macintosh (Chrome/Safari)';
    else if (/Windows/i.test(userAgent)) deviceName = 'Windows PC';

    const newLog: VisitLog = {
      id: 'log-' + Date.now(),
      timestamp: 'Just now',
      ipMasked: `${Math.floor(Math.random() * 180) + 20}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.***`,
      location: isUnique ? 'Live Visitor' : 'Returning Visitor',
      device: deviceName,
      source: document.referrer ? new URL(document.referrer).hostname : 'Direct Visit',
      section: section,
      durationSeconds: Math.floor(Math.random() * 120) + 30,
    };

    data.logs = [newLog, ...data.logs.slice(0, 15)];
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to record pageview:', err);
  }
};

export const recordConversion = () => {
  try {
    const data = getStoredAnalytics();
    data.conversions += 1;
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to record conversion:', err);
  }
};

export const simulatePulse = (): AnalyticsData => {
  const data = getStoredAnalytics();
  data.totalViews += Math.floor(Math.random() * 5) + 1;
  data.uniqueVisitors += Math.random() > 0.6 ? 1 : 0;
  
  const sampleLocations = [
    'New York, USA', 'London, UK', 'Toronto, Canada', 'Berlin, Germany', 
    'Sydney, Australia', 'Singapore', 'Dubai, UAE', 'Tokyo, Japan'
  ];
  const sampleSources = ['LinkedIn Profile', 'Google Search', 'Direct Visit', 'GitHub', 'X / Twitter'];
  const sampleSections = ['Hero & Agent Demo', 'Services & Architecture', 'Featured Projects', 'Pricing & Packages'];

  const randomLoc = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
  const randomSrc = sampleSources[Math.floor(Math.random() * sampleSources.length)];
  const randomSec = sampleSections[Math.floor(Math.random() * sampleSections.length)];

  const simulatedLog: VisitLog = {
    id: 'log-' + Date.now(),
    timestamp: 'Just now',
    ipMasked: `${Math.floor(Math.random() * 180) + 20}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.***`,
    location: randomLoc,
    device: Math.random() > 0.4 ? 'Macintosh (Chrome)' : 'iPhone 15 (Safari)',
    source: randomSrc,
    section: randomSec,
    durationSeconds: Math.floor(Math.random() * 180) + 40,
  };

  data.logs = [simulatedLog, ...data.logs.slice(0, 15)];
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  return data;
};

export const resetAnalyticsData = (): AnalyticsData => {
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
  return DEFAULT_ANALYTICS;
};
