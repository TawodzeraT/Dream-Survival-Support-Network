export const SITE_CONFIG = {
  name: 'Dreamers and Survivors Support Network',
  shortName: 'DSSN',
  tagline: 'Empowering dreamers. Supporting survivors. Building futures.',
  email: 'info@dreamsupport.org',
  phone: '(859) 555-0192',
  address: '3888 Winthrop Dr, Lexington, KY 40514',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  }
}

export const INITIAL_COUNTER = {
  laptops: 847,
  students: 2400,
  workshops: 65,
  scholarships: 130,
}

export const PROGRAMS = [
  {
    id: 'digital-learning',
    name: 'Digital Learning',
    icon: '💻',
    tagline: 'Closing the digital divide one laptop at a time',
    path: '/digital-learning',
    description: 'We provide refurbished laptops and digital literacy training to students who lack access to technology at home.',
    details: `The Digital Learning Program is DSSN's flagship initiative. We collect, refurbish, and distribute laptops to students in under-resourced communities across Central Kentucky. Beyond hardware, we provide training workshops so every student can confidently use their device for schoolwork, college applications, and career preparation.\n\nSince our founding, this program has placed over 847 laptops in students' hands and hosted more than 65 digital literacy workshops. We partner with local schools, libraries, and community centers to identify students most in need.`,
    impact: 'Every $40 donation provides one laptop and all the training a student needs to thrive in a digital world.',
    stats: [
      { value: '847+', label: 'Laptops Donated' },
      { value: '65+', label: 'Workshops Held' },
      { value: '98%', label: 'Student Satisfaction' },
    ]
  },
  {
    id: 'teacher-support',
    name: 'Teacher Support',
    icon: '📚',
    tagline: 'Equipping educators to transform classrooms',
    path: '/teacher-support',
    description: 'Professional development workshops and classroom resources to help teachers serve underprivileged students more effectively.',
    details: `Effective teachers are the backbone of student success. Our Teacher Support Program offers professional development workshops focused on trauma-informed teaching, culturally responsive pedagogy, and integrating technology in under-resourced classrooms.\n\nWe work directly with schools that serve high proportions of students who have experienced instability, displacement, or poverty. Teachers receive ongoing coaching, curriculum resources, and a peer support network.`,
    impact: 'A $750 donation funds one full professional development workshop, reaching up to 25 educators.',
    stats: [
      { value: '200+', label: 'Teachers Trained' },
      { value: '40+', label: 'Schools Partnered' },
      { value: '5,000+', label: 'Students Impacted' },
    ]
  },
  {
    id: 'scholarships',
    name: 'Scholarships',
    icon: '🎓',
    tagline: 'Opening doors to higher education',
    path: '/scholarships',
    description: 'Need-based scholarships for first-generation college students and survivors of adverse childhood experiences.',
    details: `Our scholarship program removes financial barriers for students who have overcome significant adversity. We award need-based scholarships to first-generation college students, survivors of abuse or neglect, youth formerly in foster care, and students with undocumented family members.\n\nScholarship recipients receive not just financial support, but mentorship, college counseling, and a community of peers who understand their journey.`,
    impact: 'Scholarships range from $500 to $2,000 per academic year, renewable for up to four years.',
    stats: [
      { value: '130', label: 'Scholarships Awarded' },
      { value: '$180K+', label: 'Total Awarded' },
      { value: '89%', label: 'Graduation Rate' },
    ]
  },
  {
    id: 'college-readiness',
    name: 'College Readiness',
    icon: '🏫',
    tagline: 'Preparing every student for life after high school',
    path: '/college-readiness',
    description: 'SAT/ACT prep, college essay coaching, application support, and financial aid guidance for first-generation students.',
    details: `Navigating the college application process is daunting — especially without family members who have been through it. Our College Readiness Program guides students step by step from sophomore year through enrollment.\n\nServices include free SAT/ACT test prep courses, one-on-one college essay coaching, application workshops, FAFSA completion assistance, and college visit trips. We also connect students with alumni mentors who reflect their backgrounds.`,
    impact: '94% of program participants who apply to college are accepted to at least one four-year institution.',
    stats: [
      { value: '94%', label: 'College Acceptance Rate' },
      { value: '320+', label: 'Students Served' },
      { value: '15+', label: 'College Partners' },
    ]
  },
  {
    id: 'wellness',
    name: 'Wellness & Resilience',
    icon: '🌱',
    tagline: 'Healing the whole student',
    path: '/wellness',
    description: 'Mental health support, trauma-informed counseling, and resilience-building workshops for students facing adversity.',
    details: `Academic success is impossible without emotional wellbeing. Our Wellness & Resilience Program provides trauma-informed mental health support specifically designed for students who have experienced adverse childhood experiences (ACEs).\n\nWe offer group counseling sessions, individual peer support, mindfulness and stress-management workshops, and crisis referral services. All programming is delivered by licensed counselors in partnership with local mental health organizations.`,
    impact: 'Students in our wellness program show a 40% reduction in school absences and significantly improved academic performance.',
    stats: [
      { value: '500+', label: 'Students Supported' },
      { value: '40%', label: 'Fewer Absences' },
      { value: '12', label: 'Counseling Partners' },
    ]
  },
]

export const TEAM = [
  {
    id: 1,
    name: 'Dr. Amara Osei',
    title: 'Founder & Executive Director',
    role: 'founder',
    bio: 'Dr. Osei founded DSSN after her own journey as a first-generation college student and immigrant. She holds a doctorate in educational leadership from the University of Kentucky.',
    email: 'amara@dreamsupport.org',
    image: '',
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    title: 'Board Chair',
    role: 'board',
    bio: 'Former superintendent with 25 years in public education. Passionate about equity and access for all students.',
    email: '',
    image: '',
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    title: 'Board Member — Health & Wellness',
    role: 'board',
    bio: 'Licensed clinical psychologist specializing in childhood trauma and resilience.',
    email: '',
    image: '',
  },
  {
    id: 4,
    name: 'James Whitfield',
    title: 'Board Member — Technology',
    role: 'board',
    bio: 'Senior engineer at a Fortune 500 tech company. Leads our laptop refurbishment volunteer program.',
    email: '',
    image: '',
  },
  {
    id: 5,
    name: 'Kezia Thompson',
    title: 'Program Director',
    role: 'staff',
    bio: 'Oversees all five program areas and coordinates partnerships with schools and community organizations.',
    email: 'kezia@dreamsupport.org',
    image: '',
  },
  {
    id: 6,
    name: 'Luis Mendoza',
    title: 'College Readiness Coordinator',
    role: 'staff',
    bio: 'First-generation college graduate and former DSSN scholarship recipient. Now guides students through the same process.',
    email: 'luis@dreamsupport.org',
    image: '',
  },
]

export const DONATION_TIERS = [
  {
    amount: 40,
    label: 'Laptop Fund',
    icon: '💻',
    description: 'Provides one refurbished laptop to a student in need, fully set up with educational software.',
    impact: '1 student gets connected',
  },
  {
    amount: 100,
    label: 'Double Impact',
    icon: '🤝',
    description: 'Equips two students with personal devices for schoolwork, research, and college applications.',
    impact: '2 students get connected',
  },
  {
    amount: 600,
    label: 'Bulk Shipment',
    icon: '📦',
    description: 'Covers the cost of a bulk laptop shipment and distribution event for an entire classroom.',
    impact: 'Full classroom equipped',
  },
  {
    amount: 750,
    label: 'Teacher Workshop',
    icon: '📚',
    description: 'Funds one complete professional development workshop for up to 25 educators.',
    impact: '25 teachers trained',
  },
]

export const INITIAL_BLOG_POSTS = [
  {
    id: 1,
    title: 'How One Laptop Changed Destiny\'s Future',
    excerpt: 'When 10th-grader Destiny received her laptop through DSSN, she had never written a full essay on a computer. A year later, she\'s headed to college.',
    content: `Destiny was a sophomore at Bryan Station High School when she joined our Digital Learning program. Like many students in her neighborhood, she completed homework on her phone — typing essays with her thumbs, squinting at small screens in the back of a city bus.\n\nWhen she received her refurbished laptop, she stayed after the digital literacy workshop to ask questions for two hours. She wanted to learn everything.\n\nA year later, Destiny submitted her first college application — typed, formatted, and polished — from that same laptop. She was accepted to the University of Kentucky with a partial scholarship.\n\n"I never thought college was for me," she told us at our spring celebration. "I thought that was for people who had different lives. But DSSN showed me I could have that life too."\n\nDestiny's story is one of 847 we've been privileged to be part of. Every $40 donation makes a moment like hers possible.`,
    category: 'Student Stories',
    author: 'DSSN Team',
    date: 'April 15, 2025',
    readTime: '3 min read',
    image: '',
  },
  {
    id: 2,
    title: 'Spring Laptop Drive Breaks Records',
    excerpt: 'Our 2025 spring drive collected 142 laptops in a single weekend — our largest single-event collection ever.',
    content: `Last month, volunteers across Lexington came together for our biggest laptop drive in DSSN history. In just two days, we collected 142 laptops from homes, businesses, and corporate partners — enough to serve an entire grade level at a partner school.\n\nThe drive was hosted at three locations simultaneously: a downtown church, a public library, and a community center in the east side. Volunteer teams, many of them University of Kentucky students, collected, sorted, and began refurbishing devices on the spot.\n\n"We had no idea the response would be this massive," said Program Director Kezia Thompson. "It shows how much this community wants to invest in our kids."\n\nAll collected laptops undergo a full refurbishment process — hardware checks, deep cleaning, operating system reinstall, and educational software installation — before being distributed to students on our waitlist. Distribution events are scheduled for May and June.`,
    category: 'News',
    author: 'Kezia Thompson',
    date: 'March 28, 2025',
    readTime: '2 min read',
    image: '',
  },
  {
    id: 3,
    title: '5 Things First-Gen Students Wish Their Teachers Knew',
    excerpt: 'We asked 50 first-generation college students in our program what they wish educators understood about their experience. Here\'s what they said.',
    content: `First-generation college students navigate a world their families haven't mapped. We asked 50 students in our College Readiness program what they wish their teachers and school counselors understood. Their answers were honest, illuminating, and actionable.\n\n1. "Going to college isn't a given in my house." While many students grow up assuming college is the next step, first-gen students often have to argue for it at home — or simply not tell their family until it's decided.\n\n2. "I don't know what I don't know." FAFSA, common app, CSS profile, early decision vs. early action — these terms are foreign. A quick explanation can unlock an entire pathway.\n\n3. "Financial aid isn't free money I'm lucky to get." Many students feel shame around needing aid. Normalizing it changes everything.\n\n4. "My home situation affects my focus." Many first-gen students carry adult responsibilities — caring for siblings, translating for parents, working part-time jobs. Flexibility and understanding go a long way.\n\n5. "I need to see myself in the future." Representation matters enormously. When students see counselors, teachers, and professionals who share their background, they believe success is possible for them too.`,
    category: 'Impact',
    author: 'Luis Mendoza',
    date: 'February 10, 2025',
    readTime: '4 min read',
    image: '',
  },
]

export const GALLERY_IMAGES = [
  { id: 1, title: 'Spring Laptop Distribution', category: 'Tech Donation', emoji: '💻', color: '#1a3a6b', description: 'Students receiving laptops at our spring 2025 event' },
  { id: 2, title: 'Digital Literacy Workshop', category: 'Workshop', emoji: '📚', color: '#0f4c35', description: 'Learning tech skills at Bryan Station Community Center' },
  { id: 3, title: 'Scholarship Ceremony 2024', category: 'Graduation', emoji: '🎓', color: '#5b2b8a', description: 'Celebrating our 2024 scholarship recipients' },
  { id: 4, title: 'Teacher Training Day', category: 'Workshop', emoji: '📖', color: '#8a3000', description: 'Professional development for 30 local educators' },
  { id: 5, title: 'Community Volunteers', category: 'Community', emoji: '🤝', color: '#0a4a6b', description: 'Volunteer laptop refurbishment team' },
  { id: 6, title: 'College Campus Visit', category: 'Students', emoji: '🏫', color: '#3a1a0a', description: 'Students touring the University of Kentucky' },
  { id: 7, title: 'Wellness Workshop', category: 'Workshop', emoji: '🌱', color: '#1a4a2a', description: 'Mindfulness and resilience session' },
  { id: 8, title: 'Back to School Drive', category: 'Tech Donation', emoji: '⭐', color: '#4a1a6b', description: 'Fall 2024 laptop giveaway event' },
  { id: 9, title: 'Student Success Celebration', category: 'Graduation', emoji: '🏆', color: '#6b3a00', description: 'Annual end-of-year celebration dinner' },
  { id: 10, title: 'Board Meeting', category: 'Community', emoji: '💡', color: '#0a2a4a', description: 'Q1 2025 board of directors meeting' },
  { id: 11, title: 'Essay Writing Workshop', category: 'Students', emoji: '🎯', color: '#2a4a1a', description: 'College essay coaching session' },
  { id: 12, title: 'Fundraiser Gala 2024', category: 'Community', emoji: '🌟', color: '#4a2a00', description: 'Annual fundraising gala at the Lexington Convention Center' },
]
