/**
 * Core site configuration — contact, hero, about, education, freelance cert
 */
window.PortfolioData = window.PortfolioData || {};

window.PortfolioData.site = {
  owner: {
    name: { ar: 'ريم نواف الأسلمي', en: 'Reem Nawaf Aslami' },
    title: {
      ar: 'مطورة Full-Stack متخصصة في Back-End و API Integrations',
      en: 'Full-Stack Software Engineer specialized in Back-End and API Integrations',
    },
    role: {
      ar: 'مطورة برمجيات Full-Stack',
      en: 'Full-Stack Software Engineer',
    },
    tagline: {
      ar: 'Back-End Developer | API Integration Specialist | Microservices | .NET Core | Laravel | React',
      en: 'Back-End Developer | API Integration Specialist | Microservices | .NET Core | Laravel | React',
    },
  },
  hero: {
    description: {
      ar: 'أبني حلول رقمية آمنة وقابلة للتوسع من واجهات البرمجة وقواعد البيانات إلى لوحات التحكم وتكاملات الأنظمة لدي خبرة في الأنظمة المؤسسية منصات التأمين Microservices وتطوير تطبيقات الويب الحديثة',
      en: 'I build secure, scalable, and user-focused digital solutions — from APIs and databases to dashboards, enterprise systems, and modern web applications. Experienced in microservices, insurance platforms, and external system integrations.',
    },
    stats: [
      { icon: 'fa-clock', label: { ar: '3+ سنوات خبرة', en: '3+ Years Experience' } },
      { icon: 'fa-building', label: { ar: 'أنظمة مؤسسية', en: 'Enterprise Systems' } },
      { icon: 'fa-plug', label: { ar: 'تكاملات API', en: 'API Integrations' } },
      { icon: 'fa-layer-group', label: { ar: 'تطوير Full-Stack', en: 'Full-Stack Development' } },
      { icon: 'fa-database', label: { ar: 'قواعد البيانات و Microservices', en: 'Databases & Microservices' } },
    ],
  },
  about: {
    label: { ar: 'الخلفية', en: 'Background' },
    heading: { ar: 'التميز التقني برؤية محلية', en: 'Technical Excellence with a Local Vision' },
    description: {
      ar: 'مطورة Full-Stack في الرياض، متخصصة في بناء البنية الخلفية للأنظمة المؤسسية في قطاعات التأمين، الرياضات الذهنية، والحلول اللوجستية. أحوّل المتطلبات المعقدة إلى أنظمة رقمية آمنة وقابلة للتوسع.',
      en: 'A Full-Stack developer based in Riyadh, specialized in backend architecture for enterprise systems across insurance, mind sports, and digital operations. I turn complex requirements into secure, scalable digital systems.',
    },
    quote: {
      ar: 'أؤمن بأن التقنية أداة لتمكين المؤسسات — أركز على بناء حلول بـ .NET Core و Laravel تضمن الاستقرار، سرعة الاستجابة، وتجربة مستخدم سلسة للفرق والمستخدمين النهائيين.',
      en: 'I believe technology is a tool for empowering organizations — I focus on building solutions with .NET Core and Laravel that ensure stability, fast response times, and a smooth experience for teams and end users.',
    },
    features: [
      {
        id: 'api',
        icon: 'fa-plug',
        accent: 'cyan',
        title: { ar: 'تكامل API', en: 'API Integration' },
        description: {
          ar: 'ربط المنصات بسلاسة عبر REST و SOAP مع ضمان موثوقية التكامل والاستقرار في الإنتاج.',
          en: 'Seamlessly connecting platforms via REST and SOAP with reliable integration and production stability.',
        },
      },
      {
        id: 'enterprise',
        icon: 'fa-server',
        accent: 'purple',
        title: { ar: 'أنظمة المؤسسات', en: 'Enterprise Systems' },
        description: {
          ar: 'بناء منصات Microservices لجهات التأمين والاتحادات باستخدام .NET Core وهندسة نظيفة.',
          en: 'Building microservices platforms for insurance entities and federations using .NET Core and clean architecture.',
        },
      },
      {
        id: 'fullstack',
        icon: 'fa-code',
        accent: 'cyan',
        title: { ar: 'إتقان Full-Stack', en: 'Full-Stack Mastery' },
        description: {
          ar: 'تجارب متكاملة من قواعد بيانات عالية الأداء إلى واجهات متجاوبة ولوحات تحكم.',
          en: 'Unified experiences from high-performance databases to responsive interfaces and admin dashboards.',
        },
      },
      {
        id: 'workflow',
        icon: 'fa-qrcode',
        accent: 'purple',
        title: { ar: 'سير عمل متقدم', en: 'Advanced Workflow' },
        description: {
          ar: 'خوارزميات QR، مطابقة الفرق، دورات الموافقة، وأنظمة CRM وسير عمل مؤسسي.',
          en: 'QR algorithms, team pairing, approval lifecycles, CRM systems, and enterprise workflows.',
        },
      },
    ],
  },
  contact: {
    email: 'reem.nawafa@gmail.com',
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    linkedin: 'https://www.linkedin.com/in/reem-nawaf-17b8642b0/',
    portfolio: 'https://reem-nawaf.com',
    cta: {
      ar: 'أنا متاحة حالياً للمشاريع ذات التأثير العالي والأدوار الهندسية في المنظمات المبتكرة. للاستشارات أو طلبات التعاون.',
      en: 'I am currently available for high-impact projects and engineering roles in innovative organizations. For consultations and collaboration requests.',
    },
  },
  education: {
    degree: {
      ar: 'علوم الحاسب — برمجة وقواعد البيانات',
      en: 'Computer Science — Programming & Database Systems',
    },
    diplomaLevel: {
      ar: 'دبلوم متوسط',
      en: 'Intermediate Diploma',
    },
    institution: { ar: 'جامعة الملك سعود', en: 'King Saud University' },
    graduated: '2025',
  },
  freelanceCert: {
    title: {
      ar: 'شهادة ممارس العمل الحر',
      en: 'Freelancing Practitioner Certificate',
    },
    org: {
      ar: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      en: 'Ministry of Human Resources and Social Development',
    },
    specialization: {
      ar: 'برمجة وتطوير المواقع الإلكترونية',
      en: 'Websites Programming and Development',
    },
    date: { ar: 'مارس 2026 – مارس 2027', en: 'Mar 2026 – Mar 2027' },
    pdfPath: 'assets/certs/Freelance-Practitioner-Certificate-Web-Development.pdf',
    pdfDownloadName: 'Freelance-Practitioner-Certificate-Web-Development-Reem-Nawaf.pdf',
  },
  cvPath: 'Reem-Nawaf-Aslami-CV.pdf',
  cvDownloadName: 'Reem-Nawaf-Aslami-Full-Stack-Software-Engineer.pdf',
  seo: {
    title: 'Reem Nawaf Aslami | Full-Stack Software Engineer',
    description:
      'Portfolio of Reem Nawaf Aslami, a Saudi-based Full-Stack Software Engineer specialized in backend development, API integrations, microservices, databases, dashboards, and enterprise web systems.',
    ogTitle: 'Reem Nawaf Aslami | Full-Stack Software Engineer',
    ogDescription: 'Back-End Developer and API Integration Specialist based in Riyadh, Saudi Arabia.',
    url: 'https://reem-nawaf.com',
  },
};
