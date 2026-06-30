window.PortfolioData = window.PortfolioData || {};

window.PortfolioData.projectsSection = {
  label: { ar: 'معرض الأعمال', en: 'Portfolio' },
  heading: { ar: 'أعمال مختارة', en: 'Selected Works' },
  viewAll: { ar: 'مشاهدة جميع المشاريع', en: 'View all projects' },
  viewLess: { ar: 'عرض أقل', en: 'Show less' },
};

window.PortfolioData.projectCategories = [
  { id: 'all', label: { ar: 'الكل', en: 'All' } },
  { id: 'enterprise', label: { ar: 'مؤسسي', en: 'Enterprise' } },
  { id: 'backend', label: { ar: 'Back-End', en: 'Backend' } },
  { id: 'fullstack', label: { ar: 'Full-Stack', en: 'Full-Stack' } },
  { id: 'mobile', label: { ar: 'جوال', en: 'Mobile' } },
  { id: 'database', label: { ar: 'قواعد البيانات', en: 'Database' } },
];

window.PortfolioData.projects = [
  {
    id: 'ez-insurance',
    icon: 'fa-shield-halved',
    category: 'enterprise',
    bentoSlot: 'insurance',
    url: 'https://qc.ezinsure.com.sa/',
    cover: 'assets/projects/ez-insurance/ez-insurance-home.png',
    gallery: [
      {
        src: 'assets/projects/ez-insurance/ez-insurance-home.png',
        caption: { ar: 'الصفحة الرئيسية — تسعير تأمين المركبات', en: 'Homepage — vehicle insurance quote flow' },
      },
      {
        src: 'assets/projects/ez-insurance/ez-insurance-app.png',
        caption: { ar: 'تطبيق الجوال — التحميل والتسجيل', en: 'Mobile app — download & onboarding' },
      },
      {
        src: 'assets/projects/ez-insurance/ez-insurance-partners.png',
        caption: { ar: 'شبكة شركاء التأمين', en: 'Insurance partners network' },
      },
    ],
    modal: 'project-ez-insurance',
    coverClass: 'cover-enterprise',
    cardTitle: { ar: 'EZ Insurance', en: 'EZ Insurance' },
    cardDesc: {
      ar: 'منصة تأمين مؤسسية موزعة مبنية على Microservices وClean Architecture.',
      en: 'Distributed enterprise insurance platform built on microservices and Clean Architecture.',
    },
    cardTags: ['C#', '.NET Core 8'],
    name: {
      ar: 'EZ Insurance – منصة تأمين مؤسسية Microservices',
      en: 'EZ Insurance – Enterprise Microservices Insurance Platform',
    },
    type: { ar: 'منصة تأمين مؤسسية', en: 'Enterprise Insurance Platform' },
    tech: [
      'C#',
      '.NET Core 8',
      'Clean Architecture',
      'Microservices',
      'REST APIs',
      'SOAP (ELM, National Address)',
      'PostgreSQL',
      'CI/CD',
      'Token-Based Authentication',
    ],
    description: {
      ar: 'المساهمة في تطوير منصة تأمين موزعة مبنية على Microservices تتعامل مع تأمين المركبات وإصدار الوثائق والتكاملات التنظيمية. تطوير REST APIs آمنة وتكاملات SOAP مع الأنظمة الخارجية بما فيها خدمات ELM والعنوان الوطني.',
      en: 'Contributed to a distributed microservices-based insurance platform handling vehicle insurance, policy issuance, and regulatory integrations. Developed secure REST endpoints and SOAP-based integrations with external systems including ELM services and National Address.',
    },
    features: {
      ar: [
        'معمارية Clean Architecture لفصل الخدمات وقابلية الصيانة',
        'تنسيق نقاط النهاية والمصادقة وتحسين قواعد البيانات',
        'خطوط نشر ومراقبة إنتاج عبر CI/CD',
      ],
      en: [
        'Clean Architecture for service separation and maintainability',
        'Endpoint orchestration, authentication handling, and database optimization',
        'Production deployment pipelines and monitoring via CI/CD',
      ],
    },
  },
  {
    id: 'it-helpdesk',
    icon: 'fa-headset',
    category: 'enterprise',
    bentoSlot: 'helpdesk',
    cover: 'assets/projects/it-helpdesk/it-helpdesk-login.png',
    gallery: [
      {
        src: 'assets/projects/it-helpdesk/it-helpdesk-login.png',
        caption: { ar: 'تسجيل الدخول — بوابة الدعم الداخلي', en: 'Login — internal support portal' },
      },
      {
        src: 'assets/projects/it-helpdesk/it-helpdesk-tickets.png',
        caption: { ar: 'تذاكري — لوحة الدعم الموحدة', en: 'My Tickets — unified support dashboard' },
      },
    ],
    modal: 'project-it-helpdesk',
    coverClass: 'cover-helpdesk',
    cardTitle: { ar: 'مكتب مساعدة IT', en: 'IT Help Desk' },
    cardDesc: {
      ar: 'نظام داخلي آمن لإدارة التذاكر وسير عمل الموافقات متعدد المراحل.',
      en: 'Secure internal system for ticket management and multi-stage approval workflows.',
    },
    cardTags: ['C#', 'ASP.NET Core'],
    name: {
      ar: 'IT Help Desk – إدارة سير العمل والوصول',
      en: 'IT Help Desk System – Enterprise Workflow & Access Management',
    },
    type: { ar: 'نظام مؤسسي داخلي', en: 'Internal Enterprise System' },
    tech: [
      'C#',
      'ASP.NET Core 8 (MVC)',
      'Entity Framework Core',
      'Microsoft SQL Server',
      'ASP.NET Identity',
      'Role & Policy-Based Authorization',
      'TLS 1.2/1.3',
      'Data Protection API',
      'SMTP',
    ],
    description: {
      ar: 'تصميم وتطوير نظام IT Help Desk داخلي آمن مع سير عمل موافقات منظم (المدير → الأمن → IT). تنفيذ المصادقة والتفويض باستخدام ASP.NET Core Identity مع RBAC وسياسات الوصول.',
      en: 'Designed and developed a secure internal IT Help Desk system with structured multi-stage approval workflows (Manager → Security → IT). Implemented authentication and authorization using ASP.NET Core Identity with role-based and policy-based access control.',
    },
    features: {
      ar: [
        'إدارة دورة حياة التذاكر وطلبات الوصول',
        'تسجيل الأحداث وإشعارات البريد ومعالجة الملفات بأمان',
        'ممارسات أمان مؤسسية: Rate Limiting وCSRF وHTTPS',
      ],
      en: [
        'Ticket lifecycle and access request workflow management',
        'Event logging, email notifications, and secure file handling',
        'Enterprise security: rate limiting, CSRF protection, and enforced HTTPS',
      ],
    },
  },
  {
    id: 'smsf',
    icon: 'fa-chess-knight',
    category: 'fullstack',
    bentoSlot: 'smsf',
    url: 'https://www.sfms.sa/ar',
    cover: 'assets/projects/smsf/smsf-home.png',
    gallery: [
      {
        src: 'assets/projects/smsf/smsf-home.png',
        caption: { ar: 'الصفحة الرئيسية — البطولات والفعاليات', en: 'Homepage — tournaments & events' },
      },
      {
        src: 'assets/projects/smsf/smsf-about.png',
        caption: { ar: 'عن الاتحاد — الرؤية والإحصائيات', en: 'About — federation mission & stats' },
      },
      {
        src: 'assets/projects/smsf/smsf-sports.png',
        caption: { ar: 'الرياضات الذهنية المعتمدة', en: 'Certified mental sports showcase' },
      },
    ],
    modal: 'project-smsf',
    coverClass: 'cover-smsf',
    cardTitle: { ar: 'الاتحاد السعودي للرياضات الذهنية', en: 'Saudi Mind Sports Federation' },
    cardDesc: {
      ar: 'منصة إدارة بطولات رقمية بـ Laravel 11 مع QR وتكوين فرق آلي.',
      en: 'Digital tournament platform with Laravel 11, QR check-in, and automated team pairing.',
    },
    cardTags: ['Laravel', 'PHP'],
    name: {
      ar: 'منصة الاتحاد السعودي للرياضات الذهنية',
      en: 'Saudi Mind Sports Federation Platform',
    },
    type: { ar: 'منصة إدارة البطولات', en: 'Tournament Management Platform' },
    tech: ['Laravel 11', 'PHP', 'MySQL', 'QR Code', 'SSL', 'Filament'],
    description: {
      ar: 'قيادة تطوير منصة إدارة بطولات رقمية مع تسجيل متعدد الخطوات، موافقات المشاركين، وتكوين فرق 2v2 آلي مع رموز فريق فريدة.',
      en: 'Led development of a digital tournament management platform with multi-step registration, participant approvals, and automated 2v2 team pairing with unique team codes.',
    },
    features: {
      ar: [
        'توليد QR والمسح المباشر للتسجيل والتحقق من الطاولات',
        'تحسين أداء الخلفية واستعلامات قاعدة البيانات أثناء الفعاليات',
        'إدارة النشر والاستضافة وأمان البيئة',
      ],
      en: [
        'QR generation and live scanning for check-in and table verification',
        'Backend and database optimization for live event scalability',
        'Deployment, hosting, SSL, and environment security',
      ],
    },
  },
  {
    id: 'yaqeen-website',
    icon: 'fa-globe',
    category: 'fullstack',
    url: 'https://yub.com.sa/',
    cover: 'assets/projects/yaqeen/yaqeen-home.png',
    gallery: [
      {
        src: 'assets/projects/yaqeen/yaqeen-home.png',
        caption: { ar: 'الصفحة الرئيسية — حلول التأمين', en: 'Homepage — insurance solutions' },
      },
      {
        src: 'assets/projects/yaqeen/yaqeen-services.png',
        caption: { ar: 'الخدمات — بطاقات التغطية التأمينية', en: 'Services — insurance coverage cards' },
      },
    ],
    modal: 'project-yaqeen',
    coverClass: 'cover-web',
    cardTitle: { ar: 'يقين المتحدة للتأمين', en: 'Yaqeen United Insurance' },
    cardDesc: {
      ar: 'موقع تأمين متجاوب مع واجهة تفاعلية وبحث متقدم في المقالات والخدمات.',
      en: 'Responsive insurance website with interactive UI and advanced content search.',
    },
    cardTags: ['Bootstrap', 'JavaScript'],
    name: {
      ar: 'يقين المتحدة للتأمين – موقع الشركة',
      en: 'Yaqeen United Insurance – Company Website',
    },
    type: { ar: 'موقع شركة', en: 'Company Website' },
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'jQuery',
      'Font Awesome',
      'Owl Carousel',
      'Swiper',
      'Netlify',
    ],
    description: {
      ar: 'بناء موقع تأمين متعدد الخدمات متجاوب مع واجهة تفاعلية وبحث متقدم في المقالات والخدمات.',
      en: 'Built a responsive, multi-service insurance website with an interactive UI and advanced search for articles and services.',
    },
    features: {
      ar: [
        'تصميم متجاوب لجميع الأجهزة',
        'واجهة تفاعلية وعرض خدمات التأمين',
      ],
      en: [
        'Fully responsive layout across devices',
        'Interactive UI showcasing insurance services',
      ],
    },
  },
  {
    id: 'crm-callcenter',
    icon: 'fa-phone-volume',
    category: 'backend',
    cover: 'assets/projects/crm-callcenter/crm-activity-logs.png',
    gallery: [
      {
        src: 'assets/projects/crm-callcenter/crm-activity-logs.png',
        caption: { ar: 'سجلات النشاط — تتبع الأحداث', en: 'Activity logs — event monitoring' },
      },
      {
        src: 'assets/projects/crm-callcenter/crm-reports.png',
        caption: { ar: 'التقارير — مؤشرات الأداء', en: 'Reports — KPIs & analytics' },
      },
    ],
    modal: 'project-crm',
    coverClass: 'cover-crm',
    cardTitle: { ar: 'CRM Call Center', en: 'CRM Call Center' },
    cardDesc: {
      ar: 'نظام CRM لمركز الاتصال مع سجلات المكالمات وتقييمات العملاء.',
      en: 'Call center CRM with call logs, customer ratings, and agent performance.',
    },
    cardTags: ['PHP', 'MySQL'],
    name: {
      ar: 'CRM Call Center – نظام تسجيل المكالمات',
      en: 'CRM Call Center System – Call Logging & Rating Dashboard',
    },
    type: { ar: 'CRM / لوحة تحكم', en: 'CRM / Dashboard System' },
    tech: ['PHP', 'MySQL', 'REST APIs', 'JavaScript', 'AJAX'],
    description: {
      ar: 'تطوير نظام CRM لإدارة عمليات مركز الاتصال يشمل سجلات المكالمات وتقييمات العملاء وتتبع أداء الموظفين.',
      en: 'Developed a CRM system for call center operations including call logs, customer ratings, and agent performance tracking.',
    },
    features: {
      ar: [
        'واجهات برمجية لمعالجة بيانات الاتصالات الهاتفية',
        'لوحات تحكم ديناميكية للتقارير التشغيلية',
        'تصميم قاعدة البيانات وتحسين الاستعلامات للبيانات اللحظية',
      ],
      en: [
        'Backend APIs to process telephony data',
        'Dynamic dashboards for operational reporting',
        'Database design and query optimization for real-time data',
      ],
    },
  },
  {
    id: 'car-rental',
    icon: 'fa-car',
    category: 'fullstack',
    url: 'https://appcarrental.netlify.app/',
    cover: 'assets/projects/car-rental/car-rental-home.png',
    gallery: [
      {
        src: 'assets/projects/car-rental/car-rental-home.png',
        caption: { ar: 'الصفحة الرئيسية — البحث والحجز', en: 'Homepage — search & booking' },
      },
      {
        src: 'assets/projects/car-rental/car-rental-services.png',
        caption: { ar: 'الخدمات — الاشتراكات والأعمال', en: 'Services — subscriptions & business' },
      },
      {
        src: 'assets/projects/car-rental/car-rental-footer.png',
        caption: { ar: 'التذييل — الروابط والتطبيق', en: 'Footer — navigation & app links' },
      },
    ],
    modal: 'project-car-rental',
    coverClass: 'cover-rental',
    cardTitle: { ar: 'تطبيق تأجير وحجز السيارات', en: 'Car Rental & Booking App' },
    cardDesc: {
      ar: 'تطبيق ويب تفاعلي لاستعراض وحجز السيارات مع إدارة حالة عبر Redux.',
      en: 'Interactive web app to browse and book cars with Redux state management.',
    },
    cardTags: ['React', 'Redux'],
    name: { ar: 'تطبيق تأجير وحجز السيارات', en: 'Car Rental & Booking Application' },
    type: { ar: 'تطبيق ويب ديناميكي', en: 'Dynamic Web Application' },
    tech: ['React', 'Redux', 'JavaScript', 'RESTful APIs', 'Local Storage', 'Bootstrap', 'CSS'],
    description: {
      ar: 'تطبيق ويب ديناميكي لتصفح وحجز السيارات المؤجرة مع فلاتر ذكية، نظام حجز متكامل، وواجهة متجاوبة مع جلب بيانات لحظي عبر API.',
      en: 'Dynamic web application for browsing and booking rental cars with smart filters, integrated booking flow, responsive UI, and real-time API data fetching.',
    },
    features: {
      ar: [
        'فلاتر حسب الفئة والسعر',
        'تدفق حجز متكامل مع إشعارات',
        'واجهة متجاوبة وأداء محسّن',
      ],
      en: [
        'Smart filters by category and price',
        'Integrated booking flow with notifications',
        'Responsive UI with optimized performance',
      ],
    },
  },
  {
    id: 'merchant-analytics',
    icon: 'fa-chart-line',
    category: 'fullstack',
    cover: 'assets/projects/merchant-analytics/merchant-overview.png',
    gallery: [
      {
        src: 'assets/projects/merchant-analytics/merchant-overview.png',
        caption: { ar: 'نظرة عامة — مؤشرات الأداء', en: 'Overview — KPIs & quick actions' },
      },
      {
        src: 'assets/projects/merchant-analytics/merchant-analytics.png',
        caption: { ar: 'التحليلات — الفروع والمعاملات', en: 'Analytics — branches & transactions' },
      },
    ],
    modal: 'project-merchant-analytics',
    coverClass: 'cover-analytics',
    cardTitle: { ar: 'تحليل بيانات التاجر', en: 'Merchant Data Analytics' },
    cardDesc: {
      ar: 'لوحة React لتحليل المعاملات ومؤشرات الأداء واتجاهات التشغيل.',
      en: 'React dashboard for transaction analytics, KPIs, and operational trends.',
    },
    cardTags: ['React', 'Charts'],
    name: { ar: 'تحليل بيانات بواسطة React', en: 'Data Analysis with React' },
    type: { ar: 'لوحة تحليل بيانات', en: 'Analytics Dashboard' },
    tech: ['React', 'JavaScript', 'Charts', 'REST APIs', 'Bootstrap', 'CSS'],
    description: {
      ar: 'تطبيق ويب لتحليل بيانات التاجر يعرض مؤشرات الأداء، اتجاهات المعاملات، أداء الفروع، وحالة المدفوعات بشكل لحظي.',
      en: 'Web analytics application displaying merchant KPIs, transaction trends, branch performance, and payment statuses in real time.',
    },
    features: {
      ar: [
        'مؤشرات الحجم والموافقات والرفض والاسترداد',
        'ترتيب الفروع وآخر المعاملات',
        'مخططات uptime للأجهزة والرؤى التشغيلية',
      ],
      en: [
        'Volume, approvals, declines, and refund KPIs',
        'Branch rankings and latest transactions',
        'Terminal uptime charts and operational insights',
      ],
    },
  },
];

(function () {
  const showcaseOrder = [
    'yaqeen-website',
    'car-rental',
    'ez-insurance',
    'smsf',
    'merchant-analytics',
    'it-helpdesk',
    'crm-callcenter',
  ];
  const byId = Object.fromEntries(window.PortfolioData.projects.map((p) => [p.id, p]));
  window.PortfolioData.projects = showcaseOrder.map((id) => byId[id]).filter(Boolean);
})();
