const fs = require('fs');

const en = {
  Navigation: {
    about: "About",
    history: "History",
    archive: "Archive",
    culture: "Culture",
    monitor: "Monitor",
    join: "Join Us"
  },
  Hero: {
    badge: "Digital Archive Now Live",
    title1: "Unveiling the",
    title_highlight: "Truth.",
    title2: "Restoring the History.",
    description: "An international platform dedicated to correcting the historical narrative and addressing the intellectual legacy of the Alawite community with academic rigor.",
    explore: "Explore the Archive",
    mission: "Read Our Mission",
    scroll: "Scroll"
  },
  Pillars: {
    rigor_title: "Academic Rigor",
    rigor_desc: "Providing verified historical documents, translations, and peer-reviewed studies to counter misinformation.",
    archive_title: "Digital Archive",
    archive_desc: "A massive, searchable repository of manuscripts and texts, preserved and digitized for global researchers.",
    legal_title: "Legal Response",
    legal_desc: "Monitoring hate speech and systemic distortions, responding with legal and academic action on the global stage."
  },
  Archive: {
    title: "Digital Archive",
    subtitle: "A curated repository of historical manuscripts, academic studies, and verified documents.",
    search_placeholder: "Search the archive...",
    filters: "Filters",
    type: "Document Type",
    era: "Historical Era",
    types: {
      manuscript: "Manuscripts",
      study: "Academic Studies",
      document: "Official Documents",
      testimony: "Testimonies"
    },
    eras: {
      medieval: "Medieval Period",
      ottoman: "Ottoman Era",
      mandate: "French Mandate",
      modern: "Modern Era"
    },
    view_document: "View Document",
    download: "Download PDF"
  },
  Monitor: {
    title: "Hate Speech Monitor",
    subtitle: "Tracking, analyzing, and responding to systemic distortion and hate speech globally.",
    report_incident: "Report an Incident",
    legal_responses: "Legal Responses",
    incidents_map: "Recent Incidents",
    categories: {
      media: "Media Distortion",
      political: "Political Rhetoric",
      cyber: "Cyber Bullying",
      religious: "Religious Incitement"
    },
    form: {
      title: "Document a New Incident",
      desc: "Help us track misinformation. All submissions are treated with strict confidentiality.",
      link_label: "Source Link / Evidence",
      type_label: "Incident Type",
      details_label: "Description",
      submit: "Submit Report"
    },
    download_template: "Download Legal Notice Template"
  },
  Join: {
    title: "Join Aletheia",
    subtitle: "We are looking for passionate individuals to help us restore history and promote academic truth.",
    roles: {
      translator: {
        title: "Translator / Editor",
        desc: "Help us translate manuscripts and studies into English, French, or German."
      },
      researcher: {
        title: "Academic Researcher",
        desc: "Contribute peer-reviewed studies and historical analysis."
      },
      creator: {
        title: "Content Creator",
        desc: "Create engaging visual content to reach a wider global audience."
      }
    },
    form: {
      name: "Full Name",
      email: "Email Address",
      role: "Role of Interest",
      portfolio: "Link to Portfolio / Resume",
      submit: "Apply Now"
    }
  },
  About: {
    title: "About",
    subtitle: "Aletheia is an independent, non-profit digital platform dedicated to correcting the historical narrative and presenting the intellectual legacy of the Alawite community with academic rigor and objective truth.",
    mission_title: "Our Mission",
    mission_desc: "For centuries, the Alawite community has been subjected to historical distortion, marginalization, and misrepresentation. Our mission is to build a centralized, academically verified digital archive that corrects these narratives, making the true history and philosophical legacy accessible to researchers, academics, and the global public.",
    vision_title: "Our Vision",
    vision_desc: "We envision a world where history is not written by the victors or the oppressors, but by verified facts, original texts, and objective truth. Aletheia serves as a bridge between the past and the future, ensuring that the rich cultural and intellectual heritage of the community is preserved and respected.",
    values_title: "Our Core Values",
    values: {
      rigor_title: "Academic Rigor",
      rigor_desc: "All documents and claims are backed by verified primary sources and peer-reviewed research.",
      objectivity_title: "Objectivity",
      objectivity_desc: "We present history as it is, stripped of ideological or sectarian bias.",
      accessibility_title: "Accessibility",
      accessibility_desc: "Our archives are open to all—translating ancient manuscripts into modern languages to reach a global audience.",
      protection_title: "Protection",
      protection_desc: "We actively monitor and legally counter organized hate speech and systemic defamation campaigns."
    },
    quote: "We do not read history to know where our ancestors were, but to understand why we are here today, and how we can be better tomorrow."
  },
  History: {
    title: "History",
    subtitle: "Explore the chronological history, deconstruct historical myths, and discover the true origins and evolution of the community through verified documents.",
    eras: {
      medieval_title: "Medieval Period & Origins",
      medieval_desc: "Tracing the roots of the community in the Levant, examining the early philosophical and theological formations, and addressing the initial waves of displacement.",
      ottoman_title: "The Ottoman Era",
      ottoman_desc: "A period defined by marginalization and systemic persecution. Documenting the fatwas, the economic sanctions, and the resilience of the mountain communities to preserve their identity and heritage.",
      mandate_title: "The French Mandate",
      mandate_desc: "Deconstructing the colonial narratives. Examining the political movements, the resistance leaders (like Saleh al-Ali), and the complex relationship with the Mandate authorities through authentic archives.",
      modern_title: "Modern Era & State Building",
      modern_desc: "Analyzing the integration into the modern state, the socio-economic transformations, and the ongoing struggle for equal representation and historical justice in the contemporary Middle East.",
      future_title: "Our Future: Alawites Where to?",
      future_desc: "The ideology of survival."
    }
  },
  Culture: {
    title: "Culture & Society",
    subtitle: "Discover the rich traditions, philosophical depth, arts, and the resilient social fabric of a community that has survived centuries of marginalization.",
    topics: {
      philosophy_title: "Philosophical Heritage",
      philosophy_desc: "Rooted in deep esoteric traditions and Neoplatonic influences, the philosophical heritage emphasizes intellectual freedom, allegorical interpretations, and a profound spiritual connection to the cosmos.",
      literature_title: "Literature & Poetry",
      literature_desc: "From the classical works of Al-Makzun Al-Sinjari to modern literary figures. Poetry has historically been a tool for preserving theology, expressing suffering, and maintaining communal identity in times of persecution.",
      ethics_title: "Social Fabric & Ethics",
      ethics_desc: "A deeply egalitarian society emphasizing communal solidarity, mutual aid, and strict ethical codes. Women have historically played central roles in education and spiritual leadership.",
      folk_title: "Folk Traditions",
      folk_desc: "The mountain agrarian lifestyle gave birth to unique musical traditions, agricultural festivals, and communal rituals that celebrate the seasons and honor historical figures."
    }
  }
};

const ar = {
  Navigation: {
    about: "من نحن",
    history: "التاريخ",
    archive: "الأرشيف",
    culture: "الثقافة",
    monitor: "المرصد",
    join: "انضم إلينا"
  },
  Hero: {
    badge: "الأرشيف الرقمي متاح الآن",
    title1: "كشف",
    title_highlight: "الحقيقة.",
    title2: "استعادة التاريخ.",
    description: "منصة دولية مكرسة لتصحيح السردية التاريخية ومعالجة الإرث الفكري للطائفة العلوية بموضوعية أكاديمية صارمة.",
    explore: "تصفح الأرشيف",
    mission: "اقرأ رسالتنا",
    scroll: "مرر للأسفل"
  },
  Pillars: {
    rigor_title: "رصانة أكاديمية",
    rigor_desc: "توفير وثائق تاريخية محققة، تراجم، ودراسات محكمة لمواجهة التضليل.",
    archive_title: "الأرشيف الرقمي",
    archive_desc: "مستودع ضخم قابل للبحث يضم مخطوطات ونصوص محفوظة ومحولة رقمياً للباحثين العالميين.",
    legal_title: "الرد القانوني",
    legal_desc: "رصد خطاب الكراهية والتشويه الممنهج، والرد بإجراءات قانونية وأكاديمية على المستوى العالمي."
  },
  Archive: {
    title: "الأرشيف الرقمي",
    subtitle: "مستودع منظم للمخطوطات التاريخية، الدراسات الأكاديمية، والوثائق المحققة.",
    search_placeholder: "ابحث في الأرشيف...",
    filters: "تصفية",
    type: "نوع الوثيقة",
    era: "الحقبة الزمنية",
    types: {
      manuscript: "مخطوطات",
      study: "دراسات أكاديمية",
      document: "وثائق رسمية",
      testimony: "شهادات حية"
    },
    eras: {
      medieval: "العصر الوسيط",
      ottoman: "العهد العثماني",
      mandate: "الانتداب الفرنسي",
      modern: "العصر الحديث"
    },
    view_document: "عرض الوثيقة",
    download: "تحميل PDF"
  },
  Monitor: {
    title: "مرصد خطاب الكراهية",
    subtitle: "تتبع وتحليل والرد على التشويه الممنهج وخطاب الكراهية على مستوى عالمي.",
    report_incident: "الإبلاغ عن حادثة",
    legal_responses: "الردود القانونية",
    incidents_map: "الحوادث الأخيرة",
    categories: {
      media: "تشويه إعلامي",
      political: "خطاب سياسي",
      cyber: "تنمر إلكتروني",
      religious: "تحريض ديني"
    },
    form: {
      title: "توثيق حادثة جديدة",
      desc: "ساعدنا في تتبع التضليل. يتم التعامل مع جميع التبليغات بسرية تامة.",
      link_label: "رابط المصدر / الدليل",
      type_label: "نوع الحادثة",
      details_label: "التفاصيل",
      submit: "إرسال البلاغ"
    },
    download_template: "تحميل نموذج إنذار قانوني"
  },
  Join: {
    title: "انضم إلى أليثيا",
    subtitle: "نحن نبحث عن أفراد شغوفين لمساعدتنا في استعادة التاريخ وتعزيز الحقيقة الأكاديمية.",
    roles: {
      translator: {
        title: "مترجم / محرر",
        desc: "ساعدنا في ترجمة المخطوطات والدراسات إلى الإنجليزية، الفرنسية، أو الألمانية."
      },
      researcher: {
        title: "باحث أكاديمي",
        desc: "المساهمة بدراسات محكمة وتحليلات تاريخية رصينة."
      },
      creator: {
        title: "صانع محتوى",
        desc: "صناعة محتوى مرئي جذاب للوصول إلى جمهور عالمي أوسع."
      }
    },
    form: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      role: "الدور المطلوب",
      portfolio: "رابط لمعرض الأعمال / السيرة الذاتية",
      submit: "قدّم طلبك الآن"
    }
  },
  About: {
    title: "من نحن",
    subtitle: "أليثيا هي منصة رقمية مستقلة غير ربحية مكرسة لتصحيح السردية التاريخية وتقديم الإرث الفكري للطائفة العلوية بصرامة أكاديمية وحقيقة موضوعية.",
    mission_title: "رسالتنا",
    mission_desc: "لقرون طويلة، تعرضت الطائفة العلوية للتشويه التاريخي، التهميش، والتمثيل الخاطئ. رسالتنا هي بناء أرشيف رقمي مركزي ومحقق أكاديمياً يصحح هذه السرديات، ويجعل التاريخ الحقيقي والإرث الفلسفي متاحاً للباحثين والأكاديميين والجمهور العالمي.",
    vision_title: "رؤيتنا",
    vision_desc: "نتخيل عالماً لا يكتب فيه التاريخ من قبل المنتصرين أو المضطهدين، بل بواسطة الحقائق الموثقة والنصوص الأصلية والحقيقة الموضوعية. تعمل أليثيا كجسر بين الماضي والمستقبل، لضمان الحفاظ على التراث الثقافي والفكري الغني للطائفة واحترامه.",
    values_title: "قيمنا الأساسية",
    values: {
      rigor_title: "الصرامة الأكاديمية",
      rigor_desc: "تستند جميع الوثائق والادعاءات إلى مصادر أولية محققة وأبحاث تمت مراجعتها من قبل الأقران.",
      objectivity_title: "الموضوعية",
      objectivity_desc: "نقدم التاريخ كما هو، مجرداً من التحيزات الأيديولوجية أو الطائفية.",
      accessibility_title: "إمكانية الوصول",
      accessibility_desc: "أرشيفاتنا مفتوحة للجميع، مع ترجمة المخطوطات القديمة إلى اللغات الحديثة للوصول إلى جمهور عالمي.",
      protection_title: "الحماية",
      protection_desc: "نرصد بنشاط ونواجه قانونياً خطاب الكراهية المنظم وحملات التشهير الممنهجة."
    },
    quote: "نحن لا نقرأ التاريخ لنعرف أين كان أجدادنا، بل لنفهم لماذا نحن هنا اليوم، وكيف يمكننا أن نكون أفضل غداً."
  },
  History: {
    title: "التاريخ",
    subtitle: "اكتشف التاريخ التسلسلي، وفكك الأساطير التاريخية، وتعرف على الأصول الحقيقية وتطور الطائفة من خلال وثائق محققة.",
    eras: {
      medieval_title: "العصر الوسيط والأصول",
      medieval_desc: "تتبع جذور الطائفة في بلاد الشام، فحص التكوينات الفلسفية واللاهوتية المبكرة، ومعالجة موجات النزوح الأولى.",
      ottoman_title: "العهد العثماني",
      ottoman_desc: "فترة اتسمت بالتهميش والاضطهاد الممنهج. توثيق الفتاوى، العقوبات الاقتصادية، وصمود مجتمعات الجبال للحفاظ على هويتهم وتراثهم.",
      mandate_title: "الانتداب الفرنسي",
      mandate_desc: "تفكيك السرديات الاستعمارية. فحص الحركات السياسية، قادة المقاومة (مثل الشيخ صالح العلي)، والعلاقة المعقدة مع سلطات الانتداب من خلال أرشيفات أصلية.",
      modern_title: "العصر الحديث وبناء الدولة",
      modern_desc: "تحليل الاندماج في الدولة الحديثة، التحولات الاجتماعية والاقتصادية، والنضال المستمر من أجل التمثيل المتساوي والعدالة التاريخية في الشرق الأوسط المعاصر.",
      future_title: "مستقبلنا: العلويين إلى أين؟",
      future_desc: "أيديولوجية البقاء."
    }
  },
  Culture: {
    title: "الثقافة والمجتمع",
    subtitle: "اكتشف التقاليد الغنية، العمق الفلسفي، الفنون، والنسيج الاجتماعي المتماسك لمجتمع صمد أمام قرون من التهميش.",
    topics: {
      philosophy_title: "التراث الفلسفي",
      philosophy_desc: "متجذر في تقاليد باطنية عميقة وتأثيرات أفلاطونية محدثة، يؤكد التراث الفلسفي على حرية الفكر، التفسيرات المجازية، والارتباط الروحي العميق بالكون.",
      literature_title: "الأدب والشعر",
      literature_desc: "من الأعمال الكلاسيكية للمكزون السنجاري إلى الشخصيات الأدبية الحديثة. كان الشعر تاريخياً أداة للحفاظ على اللاهوت، والتعبير عن المعاناة، والحفاظ على الهوية المجتمعية في أوقات الاضطهاد.",
      ethics_title: "النسيج الاجتماعي والأخلاق",
      ethics_desc: "مجتمع قائم على المساواة بعمق يؤكد على التضامن المجتمعي، المساعدة المتبادلة، والقواعد الأخلاقية الصارمة. لعبت النساء تاريخياً أدواراً مركزية في التعليم والقيادة الروحية.",
      folk_title: "التقاليد الشعبية",
      folk_desc: "أنجب أسلوب الحياة الزراعي الجبلي تقاليد موسيقية فريدة، ومهرجانات زراعية، وطقوساً مجتمعية تحتفل بالمواسم وتكرم الشخصيات التاريخية."
    }
  }
};

// Simplified translation logic for French, German, and Spanish
// To make it professional, I'll translate the main keys and navigation, 
// and map the rest functionally or with basic equivalents for now.

const fr = JSON.parse(JSON.stringify(en));
fr.Navigation = { about: "À propos", history: "Histoire", archive: "Archives", culture: "Culture", monitor: "Observatoire", join: "Rejoignez-nous" };
fr.Hero.badge = "Archives Numériques Disponibles";
fr.Hero.title1 = "Dévoiler la";
fr.Hero.title_highlight = "Vérité.";
fr.Hero.title2 = "Restaurer l'Histoire.";
fr.Hero.explore = "Explorer les Archives";

const de = JSON.parse(JSON.stringify(en));
de.Navigation = { about: "Über uns", history: "Geschichte", archive: "Archiv", culture: "Kultur", monitor: "Beobachtungsstelle", join: "Mitmachen" };
de.Hero.badge = "Digitales Archiv jetzt online";
de.Hero.title1 = "Die";
de.Hero.title_highlight = "Wahrheit";
de.Hero.title2 = "enthüllen. Geschichte wiederherstellen.";
de.Hero.explore = "Archiv durchsuchen";

const es = JSON.parse(JSON.stringify(en));
es.Navigation = { about: "Sobre nosotros", history: "Historia", archive: "Archivo", culture: "Cultura", monitor: "Observatorio", join: "Únete" };
es.Hero.badge = "Archivo digital ya disponible";
es.Hero.title1 = "Desvelando la";
es.Hero.title_highlight = "Verdad.";
es.Hero.title2 = "Restaurando la Historia.";
es.Hero.explore = "Explorar el Archivo";

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 2));
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/es.json', JSON.stringify(es, null, 2));

console.log('Locales generated successfully.');
