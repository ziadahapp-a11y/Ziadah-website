export interface ArticleSection {
  type: "heading" | "paragraph" | "numbered" | "tip" | "warning" | "list";
  text?: string;
  items?: string[];
}

export interface FullArticle {
  id: string;
  categoryId: string;
  title: string;
  titleEn?: string;
  desc: string;
  descEn?: string;
  time: string;
  timeEn?: string;
  sections: ArticleSection[];
  sectionsEn?: ArticleSection[];
}

export interface Category {
  id: string;
  label: string;
  labelEn?: string;
  color: string;
  icon: string;
  articles: FullArticle[];
}

export const categories: Category[] = [
  {
    id: "start",
    label: "البداية السريعة",
    labelEn: "Quick Start",
    color: "#8b5cf6",
    icon: "⚡",
    articles: [
      {
        id: "start-zid",
        categoryId: "start",
        title: "كيف تفعّل زيادة على منصة زد؟",
        titleEn: "How to Activate Ziadah on Zid?",
        desc: "خطوات التفعيل بالتفصيل - من الدخول للمتجر حتى أول اقتراح ذكي.",
        descEn: "Step-by-step activation guide — from store login to your first smart recommendation.",
        time: "3 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "تفعيل زيادة على منصة زد عملية سهلة لا تستغرق أكثر من 10 دقائق. اتبع هذه الخطوات لتبدأ باستقبال توصيات ذكية في متجرك فوراً." },
          { type: "heading", text: "المتطلبات الأساسية" },
          { type: "list", items: [
            "حساب نشط على منصة زد",
            "متجر يحتوي على منتجات محدّثة",
            "اشتراك في إحدى باقات زيادة"
          ]},
          { type: "heading", text: "خطوات التفعيل" },
          { type: "numbered", items: [
            "توجّه إلى سوق التطبيقات على منصة زد من خلال لوحة التحكم",
            "ابحث عن تطبيق \"زيادة\" في شريط البحث",
            "انقر على \"إضافة التطبيق\" واختر الباقة المناسبة لك",
            "سيتم توجيهك تلقائياً لصفحة مصادقة زيادة - اختر متجرك وامنح الصلاحيات المطلوبة",
            "بعد المصادقة، ستنتقل إلى لوحة تحكم زيادة مباشرة",
            "سيبدأ النظام بمزامنة منتجاتك وفئاتك تلقائياً - قد يستغرق هذا من 1 إلى 5 دقائق بحسب حجم المتجر",
            "بمجرد اكتمال المزامنة، ستظهر رسالة تأكيد وتكون جاهزاً لإنشاء أول حملة"
          ]},
          { type: "tip", text: "نصيحة: تأكد من أن منتجاتك في زد تحتوي على أوصاف وفئات واضحة - هذا يساعد الذكاء الاصطناعي في تقديم توصيات أدق منذ البداية." },
          { type: "heading", text: "التحقق من نجاح التفعيل" },
          { type: "paragraph", text: "بعد التفعيل، انتقل للوحة التحكم في زيادة. إذا كانت تعرض عدد منتجاتك وفئاتك بشكل صحيح، فالتفعيل تم بنجاح. يمكنك الآن إنشاء أول حملة توصية من قسم \"الحملات\"." },
          { type: "heading", text: "مشاكل شائعة عند التفعيل" },
          { type: "list", items: [
            "إذا لم تظهر منتجاتك: تأكد من أن المنتجات في حالة \"نشط\" وليست مخفية",
            "إذا فشلت المصادقة: تأكد من أن لديك صلاحيات مدير المتجر",
            "إذا تأخرت المزامنة أكثر من 10 دقائق: تواصل مع فريق الدعم عبر واتساب"
          ]},
        ],
        sectionsEn: [
          { type: "paragraph", text: "Activating Ziadah on the Zid platform is a simple process that takes no more than 10 minutes. Follow these steps to start receiving smart recommendations in your store right away." },
          { type: "heading", text: "Prerequisites" },
          { type: "list", items: [
            "Active account on Zid platform",
            "Store with updated products",
            "Subscription to one of Ziadah's plans"
          ]},
          { type: "heading", text: "Activation Steps" },
          { type: "numbered", items: [
            "Go to the App Store on the Zid platform through the dashboard",
            "Search for the \"Ziadah\" app in the search bar",
            "Click \"Add App\" and choose the plan that suits you",
            "You will be automatically redirected to the Ziadah authentication page — select your store and grant the required permissions",
            "After authentication, you will be taken directly to the Ziadah dashboard",
            "The system will automatically sync your products and categories — this may take 1 to 5 minutes depending on store size",
            "Once the sync is complete, a confirmation message will appear and you'll be ready to create your first campaign"
          ]},
          { type: "tip", text: "Tip: Make sure your products on Zid contain clear descriptions and categories — this helps the AI provide more accurate recommendations from the start." },
          { type: "heading", text: "Verifying Successful Activation" },
          { type: "paragraph", text: "After activation, navigate to the Ziadah dashboard. If it displays your product and category counts correctly, the activation was successful. You can now create your first recommendation campaign from the \"Campaigns\" section." },
          { type: "heading", text: "Common Activation Issues" },
          { type: "list", items: [
            "If your products don't appear: Make sure the products are set to \"Active\" and not hidden",
            "If authentication fails: Ensure you have store admin permissions",
            "If sync takes more than 10 minutes: Contact the support team via WhatsApp"
          ]},
        ],
      },
      {
        id: "start-salla",
        categoryId: "start",
        title: "كيف تفعّل زيادة على منصة سلة؟",
        titleEn: "How to Activate Ziadah on Salla?",
        desc: "دليل التفعيل الكامل على سلة مع صور توضيحية لكل خطوة.",
        descEn: "Complete activation guide on Salla with screenshots for every step.",
        time: "3 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "زيادة متاحة على منصة سلة كتطبيق رسمي في متجر التطبيقات. هذا الدليل يأخذك خطوة بخطوة من التثبيت حتى أول توصية تظهر في متجرك." },
          { type: "heading", text: "خطوة 1: تثبيت التطبيق" },
          { type: "numbered", items: [
            "ادخل على لوحة تحكم سلة (المتجر)",
            "من القائمة الجانبية، انقر على \"التطبيقات\"",
            "في متجر التطبيقات، ابحث عن \"زيادة\"",
            "انقر على \"تثبيت\" وراجع الصلاحيات المطلوبة",
            "انقر على \"السماح\" لمنح التطبيق الوصول اللازم"
          ]},
          { type: "heading", text: "خطوة 2: إعداد الحساب" },
          { type: "numbered", items: [
            "بعد التثبيت، سيتم فتح واجهة إعداد زيادة",
            "أدخل بريدك الإلكتروني لإنشاء حساب أو تسجيل الدخول إذا كان لديك حساب",
            "اختر الباقة المناسبة (يمكنك البدء بالتجربة المجانية)",
            "انتظر بضع ثوانٍ حتى يتم ربط المتجر"
          ]},
          { type: "heading", text: "خطوة 3: المزامنة والاختبار" },
          { type: "numbered", items: [
            "بعد الربط، سيبدأ النظام بجلب بيانات المنتجات والفئات",
            "انتقل للوحة التحكم في زيادة وتأكد من ظهور منتجاتك",
            "أنشئ حملة تجريبية أولى من قسم \"الحملات الجديدة\"",
            "افتح متجرك وتصفح منتجاً - ستلاحظ ظهور التوصيات"
          ]},
          { type: "tip", text: "للحصول على أفضل نتيجة على سلة: فعّل \"التقييمات\" في إعدادات متجرك، لأن زيادة تستخدمها لتحسين دقة التوصيات." },
          { type: "warning", text: "تنبيه: بعض ثيمات سلة المخصصة قد تحتاج إعداداً إضافياً لظهور التوصيات. راجع قسم التقنية والتكامل إذا لم تظهر التوصيات بعد 30 دقيقة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah is available on Salla as an official app in the App Store. This guide takes you step by step from installation to your first recommendation appearing in your store." },
          { type: "heading", text: "Step 1: Installing the App" },
          { type: "numbered", items: [
            "Log in to the Salla dashboard (Store)",
            "From the sidebar, click \"Apps\"",
            "In the App Store, search for \"Ziadah\"",
            "Click \"Install\" and review the required permissions",
            "Click \"Allow\" to grant the app the necessary access"
          ]},
          { type: "heading", text: "Step 2: Account Setup" },
          { type: "numbered", items: [
            "After installation, the Ziadah setup interface will open",
            "Enter your email to create an account or log in if you already have one",
            "Choose the appropriate plan (you can start with the free trial)",
            "Wait a few seconds for the store to be linked"
          ]},
          { type: "heading", text: "Step 3: Sync and Testing" },
          { type: "numbered", items: [
            "After linking, the system will start fetching product and category data",
            "Navigate to the Ziadah dashboard and verify your products appear",
            "Create a first test campaign from the \"New Campaigns\" section",
            "Open your store and browse a product — you'll notice recommendations appearing"
          ]},
          { type: "tip", text: "For best results on Salla: Enable \"Reviews\" in your store settings, as Ziadah uses them to improve recommendation accuracy." },
          { type: "warning", text: "Note: Some custom Salla themes may require additional setup for recommendations to appear. Check the Technical & Integration section if recommendations don't appear after 30 minutes." },
        ],
      },
      {
        id: "start-first-campaign",
        categoryId: "start",
        title: "إعداد أول حملة توصية ذكية",
        titleEn: "Setting Up Your First Smart Recommendation Campaign",
        desc: "كيف تختار الهدف الأول وطريقة العرض المناسبة لمتجرك.",
        descEn: "How to choose your first goal and the right display method for your store.",
        time: "5 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "بعد ربط متجرك بزيادة، الخطوة التالية هي إنشاء أول حملة توصية. الحملة هي مجموعة من الإعدادات التي تحدد: ماذا تريد تحقيقه، وأين تظهر التوصيات، وكيف تبدو." },
          { type: "heading", text: "ما هي الحملة في زيادة؟" },
          { type: "paragraph", text: "الحملة في زيادة تربط ثلاثة عناصر: الهدف (ماذا تريد تحقيقه)، ونقطة الاقتراح (أين تظهر التوصيات في المتجر)، وطريقة العرض (كيف تبدو التوصيات للعميل). فهم هذه العناصر الثلاثة هو مفتاح نجاح حملاتك." },
          { type: "heading", text: "اختيار الهدف الأول - نصيحتنا" },
          { type: "paragraph", text: "للمتاجر الجديدة على زيادة، ننصح بالبدء بهدف \"زيادة قيمة السلة\" مع توصيات على صفحة المنتج. هذا الهدف يعطيك نتائج سريعة وقابلة للقياس خلال أسبوع." },
          { type: "heading", text: "خطوات إنشاء الحملة" },
          { type: "numbered", items: [
            "من لوحة التحكم، انقر على \"حملة جديدة\"",
            "اكتب اسماً للحملة (مثل: \"توصيات صفحة المنتج - أبريل\")",
            "اختر الهدف: ابدأ بـ \"زيادة قيمة السلة\"",
            "اختر نقطة الاقتراح: \"صفحة المنتج\"",
            "اختر طريقة العرض: \"منتجات ذات صلة\" للبداية",
            "في الإعدادات المتقدمة، اتركها على الوضع التلقائي في البداية",
            "انقر على \"نشر الحملة\" وانتظر 5-10 دقائق",
            "تصفح منتجاً في متجرك للتحقق من ظهور التوصيات"
          ]},
          { type: "tip", text: "النصيحة الذهبية: لا تنشئ أكثر من 2-3 حملات في البداية. تعلّم من نتائجها أولاً قبل التوسع. الكثير من الحملات في وقت واحد قد تقلل فعالية كل منها." },
          { type: "heading", text: "كيف تعرف أن حملتك تعمل؟" },
          { type: "list", items: [
            "اذهب للوحة التحليلات بعد 24 ساعة",
            "ابحث عن مؤشر \"الطلبات المتأثرة\" - يجب أن ترى أرقاماً",
            "راقب مؤشر CTR (نسبة النقر) - 2% فأكثر يعتبر جيداً في البداية",
            "راقب نسبة التحويل - الزيادة مقارنة بمتوسطك السابق هي قياس النجاح"
          ]},
        ],
        sectionsEn: [
          { type: "paragraph", text: "After linking your store to Ziadah, the next step is creating your first recommendation campaign. A campaign is a set of settings that define: what you want to achieve, where recommendations appear, and how they look." },
          { type: "heading", text: "What Is a Campaign in Ziadah?" },
          { type: "paragraph", text: "A campaign in Ziadah connects three elements: the goal (what you want to achieve), the suggestion point (where recommendations appear in the store), and the display method (how recommendations look to the customer). Understanding these three elements is key to your campaign's success." },
          { type: "heading", text: "Choosing Your First Goal — Our Advice" },
          { type: "paragraph", text: "For stores new to Ziadah, we recommend starting with the \"Increase Cart Value\" goal with recommendations on the product page. This goal delivers quick, measurable results within a week." },
          { type: "heading", text: "Campaign Creation Steps" },
          { type: "numbered", items: [
            "From the dashboard, click \"New Campaign\"",
            "Enter a campaign name (e.g., \"Product Page Recommendations — April\")",
            "Choose the goal: Start with \"Increase Cart Value\"",
            "Choose the suggestion point: \"Product Page\"",
            "Choose the display method: \"Related Products\" to start",
            "In the advanced settings, leave them on automatic mode initially",
            "Click \"Publish Campaign\" and wait 5–10 minutes",
            "Browse a product in your store to verify recommendations appear"
          ]},
          { type: "tip", text: "Golden tip: Don't create more than 2–3 campaigns at the start. Learn from their results first before expanding. Too many campaigns at once can reduce each one's effectiveness." },
          { type: "heading", text: "How Do You Know Your Campaign Is Working?" },
          { type: "list", items: [
            "Go to the analytics dashboard after 24 hours",
            "Look for the \"Influenced Orders\" metric — you should see numbers",
            "Monitor the CTR (click-through rate) — 2% or higher is good initially",
            "Monitor the conversion rate — the increase compared to your previous average is the measure of success"
          ]},
        ],
      },
      {
        id: "start-products",
        categoryId: "start",
        title: "ربط المنتجات والفئات",
        titleEn: "Linking Products and Categories",
        desc: "كيف يتعرف الذكاء الاصطناعي على كتالوج منتجاتك تلقائياً.",
        descEn: "How AI automatically recognizes your product catalog.",
        time: "4 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "أحد أذكى ميزات زيادة هو أنه يتعلم كتالوج منتجاتك تلقائياً دون أن تحتاج لإدخال أي بيانات يدوية. لكن هناك خطوات تنظيمية بسيطة تساعد الذكاء الاصطناعي على فهم منتجاتك بشكل أفضل." },
          { type: "heading", text: "كيف يتعلم الذكاء الاصطناعي منتجاتك؟" },
          { type: "paragraph", text: "زيادة يحلل ثلاثة مصادر رئيسية: أسماء المنتجات وأوصافها، فئات المنتجات وتصنيفاتها الفرعية، وسلوك المشترين (من اشترى ماذا معاً). كلما كانت هذه البيانات أكثر دقة، كانت التوصيات أذكى." },
          { type: "heading", text: "أفضل الممارسات لتنظيم منتجاتك" },
          { type: "numbered", items: [
            "استخدم أسماء وصفية للمنتجات: بدلاً من \"تيشيرت 123\" اكتب \"تيشيرت قطني سادة - رجالي\"",
            "أضف أوصافاً تفصيلية تذكر المواد والاستخدامات والمقاسات",
            "صنّف كل منتج في الفئة الصحيحة وأضف فئات فرعية حيثما أمكن",
            "استخدم الكلمات المفتاحية في الأوصاف (مثلاً: \"مناسب مع... يكمل...\")",
            "أضف وسوم (tags) للمنتجات المترابطة"
          ]},
          { type: "heading", text: "ربط المنتجات يدوياً (اختياري)" },
          { type: "paragraph", text: "زيادة يتيح لك ربط منتجات محددة ببعضها يدوياً إذا أردت تجاوز توصيات الذكاء الاصطناعي في حالات معينة. هذا مفيد للعروض الخاصة أو المنتجات المكملة التي تعرف أنها تباع معاً." },
          { type: "tip", text: "إذا كان متجرك يحتوي على أكثر من 500 منتج، ركّز على تنظيم أكثر 100 منتج مبيعاً أولاً - هذا سيعطيك 80% من الفائدة بـ 20% من الجهد." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "One of Ziadah's smartest features is that it automatically learns your product catalog without requiring any manual data entry. However, a few simple organizational steps help the AI understand your products better." },
          { type: "heading", text: "How Does AI Learn Your Products?" },
          { type: "paragraph", text: "Ziadah analyzes three main sources: product names and descriptions, product categories and subcategories, and buyer behavior (who bought what together). The more accurate this data is, the smarter the recommendations become." },
          { type: "heading", text: "Best Practices for Organizing Your Products" },
          { type: "numbered", items: [
            "Use descriptive product names: Instead of \"T-shirt 123\" write \"Plain Cotton T-shirt — Men's\"",
            "Add detailed descriptions mentioning materials, uses, and sizes",
            "Classify every product in the correct category and add subcategories where possible",
            "Use keywords in descriptions (e.g., \"pairs well with... complements...\")",
            "Add tags to related products"
          ]},
          { type: "heading", text: "Manual Product Linking (Optional)" },
          { type: "paragraph", text: "Ziadah allows you to manually link specific products together if you want to override AI recommendations in certain cases. This is useful for special offers or complementary products you know sell together." },
          { type: "tip", text: "If your store has more than 500 products, focus on organizing your top 100 best-selling products first — this will give you 80% of the benefit with 20% of the effort." },
        ],
      },
      {
        id: "start-analytics",
        categoryId: "start",
        title: "فهم لوحة التحليلات",
        titleEn: "Understanding the Analytics Dashboard",
        desc: "شرح كل مقياس في لوحة التحكم وكيف تقرأ النتائج بشكل صحيح.",
        descEn: "Explanation of every metric in the dashboard and how to read results correctly.",
        time: "6 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "لوحة التحليلات في زيادة هي نافذتك على أداء توصياتك الذكية. فهم هذه المقاييس بشكل صحيح يساعدك على اتخاذ قرارات أذكى لتحسين نتائج متجرك." },
          { type: "heading", text: "المقاييس الرئيسية" },
          { type: "list", items: [
            "الإيراد الإضافي: المبلغ الإضافي الذي حققته من خلال توصيات زيادة - المقياس الأهم لقياس عائد الاستثمار",
            "الطلبات المتأثرة: عدد الطلبات التي تضمنت منتجاً تم اقتراحه من زيادة",
            "CTR (نسبة النقر): نسبة العملاء الذين نقروا على توصية من إجمالي من شاهدوها",
            "نسبة التحويل من التوصية: من نقر على توصية وأضافها للسلة فعلاً",
            "متوسط قيمة السلة: كيف تغير متوسط قيمة الطلب قبل وبعد زيادة"
          ]},
          { type: "heading", text: "كيف تقرأ الأرقام بشكل صحيح" },
          { type: "paragraph", text: "لا تقيّم النتائج في أول 72 ساعة - الذكاء الاصطناعي يحتاج وقتاً للتعلم. انتظر أسبوعاً على الأقل قبل الحكم على أداء حملة جديدة. قارن الأرقام بالفترة المماثلة من الأسبوع الماضي، وليس بالأمس فقط." },
          { type: "heading", text: "مؤشرات الأداء المرجعية" },
          { type: "list", items: [
            "CTR: 2-5% يُعدّ جيداً لمعظم المتاجر",
            "نسبة التحويل من التوصية: 1-3% ممتاز",
            "الطلبات المتأثرة: يجب أن تتجاوز 10% من إجمالي الطلبات بعد شهر",
            "زيادة متوسط قيمة السلة: 15-30% هدف واقعي للشهر الأول"
          ]},
          { type: "tip", text: "استخدم خاصية \"تصدير البيانات\" في لوحة التحليلات لمشاركة التقارير مع فريقك أو تحليلها بأدوات إضافية مثل Excel أو Google Sheets." },
          { type: "warning", text: "تنبيه: إذا كان CTR أقل من 1% لأسبوع كامل، فهذا يشير إلى أن التوصيات غير ملائمة. راجع إعدادات الهدف وطريقة العرض في حملتك." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "The analytics dashboard in Ziadah is your window into the performance of your smart recommendations. Understanding these metrics correctly helps you make smarter decisions to improve your store's results." },
          { type: "heading", text: "Key Metrics" },
          { type: "list", items: [
            "Additional Revenue: The extra amount generated through Ziadah's recommendations — the most important metric for measuring ROI",
            "Influenced Orders: The number of orders that included a product suggested by Ziadah",
            "CTR (Click-Through Rate): The percentage of customers who clicked on a recommendation out of all who viewed it",
            "Recommendation Conversion Rate: Those who clicked a recommendation and actually added it to the cart",
            "Average Cart Value: How the average order value changed before and after Ziadah"
          ]},
          { type: "heading", text: "How to Read the Numbers Correctly" },
          { type: "paragraph", text: "Don't evaluate results in the first 72 hours — the AI needs time to learn. Wait at least a week before judging a new campaign's performance. Compare numbers to the same period from last week, not just yesterday." },
          { type: "heading", text: "Performance Benchmarks" },
          { type: "list", items: [
            "CTR: 2–5% is considered good for most stores",
            "Recommendation Conversion Rate: 1–3% is excellent",
            "Influenced Orders: Should exceed 10% of total orders after one month",
            "Average Cart Value Increase: 15–30% is a realistic goal for the first month"
          ]},
          { type: "tip", text: "Use the \"Export Data\" feature in the analytics dashboard to share reports with your team or analyze them with additional tools like Excel or Google Sheets." },
          { type: "warning", text: "Warning: If CTR is below 1% for a full week, this indicates the recommendations are not relevant. Review the goal and display method settings in your campaign." },
        ],
      },
      {
        id: "start-faq",
        categoryId: "start",
        title: "أسئلة شائعة للمبتدئين",
        titleEn: "Frequently Asked Questions for Beginners",
        desc: "أكثر 10 أسئلة يسألها التجار الجدد مع إجاباتها الكاملة.",
        descEn: "Top 10 questions new merchants ask with complete answers.",
        time: "7 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "جمعنا لك أكثر الأسئلة التي يطرحها التجار الجدد عند بدء استخدام زيادة. إجابات شاملة توفر عليك وقت البحث." },
          { type: "heading", text: "1. كم من الوقت حتى أرى نتائج؟" },
          { type: "paragraph", text: "تبدأ التوصيات بالظهور فور إنشاء أول حملة. لكن لترى تأثيراً ملحوظاً على المبيعات، انتظر 7-14 يوم. الذكاء الاصطناعي يحتاج بيانات كافية ليتعلم أنماط عملائك بدقة." },
          { type: "heading", text: "2. هل يؤثر زيادة على سرعة متجري؟" },
          { type: "paragraph", text: "لا. صممنا زيادة ليتحمل فقط 3 كيلوبايت إضافية على كل صفحة، ويعمل بشكل غير متزامن. هذا يعني أنه لا يوقف تحميل صفحتك في أي لحظة. تحقق من قسم \"سرعة الموقع\" في مركز المساعدة للمزيد." },
          { type: "heading", text: "3. هل يمكنني إيقاف التوصيات مؤقتاً؟" },
          { type: "paragraph", text: "نعم. يمكنك إيقاف أي حملة بنقرة واحدة دون فقدان إعداداتها. يمكنك أيضاً تحديد أوقات معينة لعمل الحملة مثل مواسم العروض فقط." },
          { type: "heading", text: "4. هل البيانات آمنة وخاصة؟" },
          { type: "paragraph", text: "نعم، جميع البيانات مشفرة ولا نشاركها مع أطراف ثالثة. نحن نلتزم بلوائح حماية البيانات الخليجية والأوروبية. راجع قسم الخصوصية للتفاصيل الكاملة." },
          { type: "heading", text: "5. ماذا لو لم أكن راضياً؟" },
          { type: "paragraph", text: "نقدم ضمان استرداد المبلغ كاملاً خلال 14 يوم من الاشتراك في أي باقة مدفوعة. لا أسئلة، لا تعقيدات." },
          { type: "heading", text: "6. هل يدعم زيادة جميع أنواع المنتجات؟" },
          { type: "paragraph", text: "زيادة يعمل مع أي نوع من المنتجات الرقمية والمادية. التوصيات تكون أدق عندما تكون المنتجات متشابهة أو مكملة لبعضها. إذا كان متجرك يبيع منتجات متنوعة جداً، استخدم الفئات بشكل صحيح." },
          { type: "heading", text: "7. ماذا يحدث للتوصيات عند نفاذ مخزون منتج؟" },
          { type: "paragraph", text: "زيادة يتزامن مع حالة المخزون في متجرك تلقائياً. المنتجات غير المتوفرة لا تُقترح للعملاء. هذا يحدث كل 15 دقيقة للحفاظ على دقة التوصيات." },
          { type: "heading", text: "8. هل يمكنني استخدام زيادة على متجرين؟" },
          { type: "paragraph", text: "كل اشتراك مرتبط بمتجر واحد. إذا كان لديك أكثر من متجر، ستحتاج اشتراكاً منفصلاً لكل متجر. نقدم خصومات للتجار الذين يديرون أكثر من متجر، تواصل معنا للاستفسار." },
          { type: "heading", text: "9. هل التوصيات تعمل على الموبايل؟" },
          { type: "paragraph", text: "نعم، التوصيات متجاوبة ومصممة لتعمل بشكل ممتاز على الجوال والتابلت والديسكتوب. أكثر من 70% من مشتريات المتاجر السعودية تتم عبر الجوال، لذلك هذا أولوية عندنا." },
          { type: "heading", text: "10. كيف أقارن أداء الحملات؟" },
          { type: "paragraph", text: "استخدم قسم \"مقارنة الحملات\" في لوحة التحليلات. يمكنك مقارنة أي حملتين جنباً إلى جنب على أي فترة زمنية. هذا يساعدك على معرفة أي الأهداف وطرق العرض أنجح لمتجرك تحديداً." },
          { type: "tip", text: "احفظ هذه الصفحة وشاركها مع فريقك - ستوفر على الجميع الكثير من الأسئلة المتكررة!" },
        ],
        sectionsEn: [
          { type: "paragraph", text: "We've compiled the most common questions new merchants ask when starting with Ziadah. Comprehensive answers that save you research time." },
          { type: "heading", text: "1. How long until I see results?" },
          { type: "paragraph", text: "Recommendations start appearing as soon as you create your first campaign. However, to see a noticeable impact on sales, wait 7–14 days. The AI needs enough data to accurately learn your customer patterns." },
          { type: "heading", text: "2. Does Ziadah affect my store's speed?" },
          { type: "paragraph", text: "No. We designed Ziadah to add only 3 kilobytes to each page, and it loads asynchronously. This means it never blocks your page from loading at any point. Check the \"Site Speed\" section in the help center for more." },
          { type: "heading", text: "3. Can I pause recommendations temporarily?" },
          { type: "paragraph", text: "Yes. You can pause any campaign with a single click without losing its settings. You can also schedule specific times for the campaign to run, such as during promotional seasons only." },
          { type: "heading", text: "4. Is my data safe and private?" },
          { type: "paragraph", text: "Yes, all data is encrypted and we do not share it with third parties. We comply with Gulf and European data protection regulations. Check the Privacy section for full details." },
          { type: "heading", text: "5. What if I'm not satisfied?" },
          { type: "paragraph", text: "We offer a full money-back guarantee within 14 days of subscribing to any paid plan. No questions, no complications." },
          { type: "heading", text: "6. Does Ziadah support all product types?" },
          { type: "paragraph", text: "Ziadah works with any type of digital or physical product. Recommendations are more accurate when products are similar or complementary. If your store sells very diverse products, use categories correctly." },
          { type: "heading", text: "7. What happens to recommendations when a product goes out of stock?" },
          { type: "paragraph", text: "Ziadah automatically syncs with your store's inventory status. Out-of-stock products are not recommended to customers. This happens every 15 minutes to maintain recommendation accuracy." },
          { type: "heading", text: "8. Can I use Ziadah on two stores?" },
          { type: "paragraph", text: "Each subscription is linked to one store. If you have more than one store, you'll need a separate subscription for each. We offer discounts for merchants managing multiple stores — contact us to inquire." },
          { type: "heading", text: "9. Do recommendations work on mobile?" },
          { type: "paragraph", text: "Yes, recommendations are responsive and designed to work excellently on mobile, tablet, and desktop. Over 70% of Saudi store purchases are made on mobile, so this is a top priority for us." },
          { type: "heading", text: "10. How do I compare campaign performance?" },
          { type: "paragraph", text: "Use the \"Compare Campaigns\" section in the analytics dashboard. You can compare any two campaigns side by side over any time period. This helps you determine which goals and display methods work best for your specific store." },
          { type: "tip", text: "Save this page and share it with your team — it will save everyone a lot of repetitive questions!" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "الخصائص والإعدادات",
    labelEn: "Features & Settings",
    color: "#06b6d4",
    icon: "⚙️",
    articles: [
      {
        id: "features-goals",
        categoryId: "features",
        title: "شرح الأهداف الـ 5 بالتفصيل",
        titleEn: "The 5 Goals Explained in Detail",
        desc: "متى تستخدم كل هدف وما الفرق بين زيادة الكمية وزيادة قيمة السلة.",
        descEn: "When to use each goal and the difference between quantity increase and cart value increase.",
        time: "8 دقائق",
        timeEn: "6 min",
        sections: [
          { type: "paragraph", text: "زيادة يقدم 5 أهداف مختلفة، كل هدف مصمم لتحقيق نتيجة تجارية محددة. اختيار الهدف الصحيح هو الخطوة الأهم في بناء حملة ناجحة." },
          { type: "heading", text: "الهدف 1: زيادة قيمة السلة (AOV)" },
          { type: "paragraph", text: "الهدف الأكثر شعبية. يركز على دفع العميل لإضافة منتجات ذات قيمة أعلى أو إضافة منتجات مكملة. مثالي للمتاجر التي تبيع منتجات متنوعة السعر." },
          { type: "list", items: [
            "متى تستخدمه: عندما تريد رفع متوسط قيمة الطلب",
            "أفضل نقاط الاقتراح: صفحة المنتج وصفحة السلة",
            "طرق العرض المناسبة: Upsell وCombo وAdd-ons"
          ]},
          { type: "heading", text: "الهدف 2: زيادة الكمية المباعة" },
          { type: "paragraph", text: "يحفز العميل على شراء كميات أكبر من نفس المنتج أو منتجات مشابهة. مناسب للمتاجر التي تبيع منتجات استهلاكية أو قابلة للشراء المتعدد." },
          { type: "list", items: [
            "متى تستخدمه: مستلزمات مكتبية، مواد تنظيف، مواد غذائية",
            "أفضل نقاط الاقتراح: صفحة المنتج وصفحة الشكر",
            "طرق العرض المناسبة: Buy More Save More وBundle"
          ]},
          { type: "heading", text: "الهدف 3: تقليل التخلي عن السلة" },
          { type: "paragraph", text: "يعمل على صفحة السلة خصيصاً لاسترداد العملاء الذين يفكرون في المغادرة دون شراء. يقدم عروضاً أو بدائل لتحفيزهم على إتمام الشراء." },
          { type: "list", items: [
            "متى تستخدمه: إذا كان معدل التخلي عن السلة لديك أعلى من 70%",
            "أفضل نقاط الاقتراح: صفحة السلة فقط",
            "طرق العرض المناسبة: كوبونات ذكية وعروض محدودة"
          ]},
          { type: "heading", text: "الهدف 4: رفع معدل التحويل" },
          { type: "paragraph", text: "يهتم بتحويل الزوار المترددين إلى مشترين. يستخدم توصيات مخصصة لكل زائر بناءً على سلوكه في المتجر." },
          { type: "list", items: [
            "متى تستخدمه: إذا كان لديك حركة زيارات عالية لكن مبيعات منخفضة",
            "أفضل نقاط الاقتراح: الصفحة الرئيسية وصفحة التصنيف",
            "طرق العرض المناسبة: منتجات مخصصة وأكثر مبيعاً"
          ]},
          { type: "heading", text: "الهدف 5: تعزيز التكرار والولاء" },
          { type: "paragraph", text: "يستهدف العملاء الذين سبق لهم الشراء ويقترح عليهم منتجات بناءً على مشترياتهم السابقة. يرفع معدل الشراء المتكرر ومتوسط قيمة العميل مدى الحياة." },
          { type: "list", items: [
            "متى تستخدمه: إذا كنت تريد رفع نسبة العملاء العائدين",
            "أفضل نقاط الاقتراح: صفحة الشكر والصفحة الرئيسية",
            "طرق العرض المناسبة: Reorder ومنتجات مكملة"
          ]},
          { type: "tip", text: "ابدأ بهدف واحد فقط لمدة شهر، ثم أضف الثاني. هذا يعطيك نتائج أوضح وأسهل في التحليل." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah offers 5 different goals, each designed to achieve a specific business outcome. Choosing the right goal is the most important step in building a successful campaign." },
          { type: "heading", text: "Goal 1: Increase Cart Value (AOV)" },
          { type: "paragraph", text: "The most popular goal. It focuses on encouraging the customer to add higher-value products or complementary items. Ideal for stores that sell products at various price points." },
          { type: "list", items: [
            "When to use: When you want to raise the average order value",
            "Best suggestion points: Product page and cart page",
            "Suitable display methods: Upsell, Combo, and Add-ons"
          ]},
          { type: "heading", text: "Goal 2: Increase Quantity Sold" },
          { type: "paragraph", text: "Motivates the customer to buy larger quantities of the same product or similar products. Suitable for stores selling consumable or multi-purchase products." },
          { type: "list", items: [
            "When to use: Office supplies, cleaning products, food items",
            "Best suggestion points: Product page and thank you page",
            "Suitable display methods: Buy More Save More and Bundle"
          ]},
          { type: "heading", text: "Goal 3: Reduce Cart Abandonment" },
          { type: "paragraph", text: "Works specifically on the cart page to recover customers thinking about leaving without purchasing. Offers deals or alternatives to encourage them to complete their purchase." },
          { type: "list", items: [
            "When to use: If your cart abandonment rate is above 70%",
            "Best suggestion points: Cart page only",
            "Suitable display methods: Smart coupons and limited-time offers"
          ]},
          { type: "heading", text: "Goal 4: Increase Conversion Rate" },
          { type: "paragraph", text: "Focuses on converting hesitant visitors into buyers. Uses personalized recommendations for each visitor based on their in-store behavior." },
          { type: "list", items: [
            "When to use: If you have high traffic but low sales",
            "Best suggestion points: Homepage and category page",
            "Suitable display methods: Personalized products and best sellers"
          ]},
          { type: "heading", text: "Goal 5: Boost Repeat Purchases and Loyalty" },
          { type: "paragraph", text: "Targets customers who have previously purchased and suggests products based on their past purchases. Increases repeat purchase rate and customer lifetime value." },
          { type: "list", items: [
            "When to use: If you want to increase your returning customer rate",
            "Best suggestion points: Thank you page and homepage",
            "Suitable display methods: Reorder and complementary products"
          ]},
          { type: "tip", text: "Start with just one goal for a month, then add the second. This gives you clearer and easier-to-analyze results." },
        ],
      },
      {
        id: "features-display",
        categoryId: "features",
        title: "طرق العرض الـ 5 وكيف تختار المناسب",
        titleEn: "The 5 Display Methods and How to Choose",
        desc: "مقارنة بين منتجات ذات صلة، Add-ons، Combo، وبقية طرق العرض.",
        descEn: "Comparison between Related Products, Add-ons, Combo, and other display methods.",
        time: "10 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "طريقة العرض تحدد كيف تُقدَّم التوصيات للعميل بصرياً وتجارياً. كل طريقة لها سيكولوجية مختلفة وتناسب سياقات شراء مختلفة." },
          { type: "heading", text: "1. منتجات ذات صلة (Related Products)" },
          { type: "paragraph", text: "الأكثر شيوعاً والأبسط. تعرض منتجات مشابهة أو مكملة في شبكة بصرية. يعمل بشكل رائع على صفحات المنتجات لزيادة فرص الاكتشاف." },
          { type: "list", items: [
            "الأفضل لـ: صفحة المنتج، صفحة التصنيف",
            "مثال: يشاهد عميل \"حذاء رياضي\" → يرى \"جورب رياضي\" و\"ربطة حذاء\"",
            "نقطة قوة: بسيط ومألوف للعملاء، لا يشتت انتباههم"
          ]},
          { type: "heading", text: "2. إضافات اختيارية (Add-ons)" },
          { type: "paragraph", text: "تعرض منتجات إضافية بسعر منخفض يمكن إضافتها بنقرة واحدة دون مغادرة الصفحة. ممتاز لرفع قيمة السلة بطريقة لا تشعر العميل بالضغط." },
          { type: "list", items: [
            "الأفضل لـ: صفحة المنتج وصفحة السلة",
            "مثال: يضيف عميل \"جوال\" → يرى \"واقي شاشة بـ 15 ⃁\" و\"كفر جوال بـ 20 ⃁\"",
            "نقطة قوة: عملية التحويل عالية لأن السعر منخفض والقيمة واضحة"
          ]},
          { type: "heading", text: "3. الحزم (Combo / Bundle)" },
          { type: "paragraph", text: "تجمع منتجات متعددة في حزمة بسعر مخفض. تحفز على شراء أكثر مقابل توفير أكبر. من أعلى طرق العرض في رفع متوسط قيمة الطلب." },
          { type: "list", items: [
            "الأفضل لـ: صفحة المنتج والصفحة الرئيسية",
            "مثال: \"اشتر الحزمة الكاملة: شامبو + بلسم + مرطب بخصم 20%\"",
            "نقطة قوة: يشعر العميل بالحصول على صفقة ممتازة"
          ]},
          { type: "heading", text: "4. الترقية (Upsell)" },
          { type: "paragraph", text: "يقترح للعميل بديلاً أفضل وأغلى من المنتج الذي يشاهده. يعمل على زيادة قيمة السلة من خلال رفع مستوى المنتج." },
          { type: "list", items: [
            "الأفضل لـ: صفحة المنتج",
            "مثال: يشاهد عميل \"قهوة عادية\" → يرى \"قهوة بريميوم بفرق 30 ⃁ فقط\"",
            "نقطة قوة: فعّال جداً في متاجر الإلكترونيات والموضة"
          ]},
          { type: "heading", text: "5. الكوبونات الذكية (Smart Coupons)" },
          { type: "paragraph", text: "تقدم كوبون خصم مشروط بشراء قيمة معينة أو منتجات محددة. يستخدم لاسترداد العملاء المترددين ورفع قيمة السلة بشكل مباشر." },
          { type: "list", items: [
            "الأفضل لـ: صفحة السلة وصفحة الشكر",
            "مثال: \"أضف 50 ⃁ للسلة واحصل على خصم 10% على طلبك\"",
            "نقطة قوة: يخلق شعوراً بالإلحاح ويحفز على إتمام الشراء"
          ]},
          { type: "tip", text: "ابدأ بـ \"منتجات ذات صلة\" ثم \"Add-ons\" - هاتان الطريقتان تعطيان النتائج الأسرع للمتاجر الجديدة على زيادة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "The display method determines how recommendations are presented to the customer visually and commercially. Each method has a different psychology and suits different purchase contexts." },
          { type: "heading", text: "1. Related Products" },
          { type: "paragraph", text: "The most common and simplest. Displays similar or complementary products in a visual grid. Works great on product pages to increase discovery opportunities." },
          { type: "list", items: [
            "Best for: Product page, category page",
            "Example: Customer views \"Running Shoes\" → sees \"Sports Socks\" and \"Shoe Laces\"",
            "Strength: Simple and familiar to customers, doesn't distract them"
          ]},
          { type: "heading", text: "2. Optional Add-ons" },
          { type: "paragraph", text: "Displays additional low-priced products that can be added with a single click without leaving the page. Excellent for increasing cart value in a way that doesn't pressure the customer." },
          { type: "list", items: [
            "Best for: Product page and cart page",
            "Example: Customer adds a \"Phone\" → sees \"Screen Protector for 15 SAR\" and \"Phone Case for 20 SAR\"",
            "Strength: High conversion rate because the price is low and the value is clear"
          ]},
          { type: "heading", text: "3. Bundles (Combo / Bundle)" },
          { type: "paragraph", text: "Groups multiple products into a bundle at a discounted price. Encourages buying more in exchange for greater savings. One of the highest display methods for raising average order value." },
          { type: "list", items: [
            "Best for: Product page and homepage",
            "Example: \"Buy the complete bundle: Shampoo + Conditioner + Moisturizer at 20% off\"",
            "Strength: Makes the customer feel they're getting a great deal"
          ]},
          { type: "heading", text: "4. Upsell" },
          { type: "paragraph", text: "Suggests a better, higher-priced alternative to the product the customer is viewing. Increases cart value by upgrading the product level." },
          { type: "list", items: [
            "Best for: Product page",
            "Example: Customer views \"Regular Coffee\" → sees \"Premium Coffee for just 30 SAR more\"",
            "Strength: Very effective in electronics and fashion stores"
          ]},
          { type: "heading", text: "5. Smart Coupons" },
          { type: "paragraph", text: "Offers a discount coupon conditional on purchasing a certain value or specific products. Used to recover hesitant customers and directly increase cart value." },
          { type: "list", items: [
            "Best for: Cart page and thank you page",
            "Example: \"Add 50 SAR to your cart and get 10% off your order\"",
            "Strength: Creates a sense of urgency and motivates purchase completion"
          ]},
          { type: "tip", text: "Start with \"Related Products\" then \"Add-ons\" — these two methods deliver the fastest results for stores new to Ziadah." },
        ],
      },
      {
        id: "features-coupons",
        categoryId: "features",
        title: "إعداد عروض الكوبونات الذكية",
        titleEn: "Setting Up Smart Coupon Offers",
        desc: "كيف تضع شروط الكوبون وتربطه بهدف معين لزيادة الفعالية.",
        descEn: "How to set coupon conditions and link them to a specific goal for maximum effectiveness.",
        time: "6 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "الكوبونات الذكية في زيادة تختلف عن كوبونات المتجر العادية - فهي مرتبطة بسلوك العميل وتُفعَّل تلقائياً في اللحظة المناسبة لتحقيق أقصى تأثير." },
          { type: "heading", text: "الفرق بين الكوبون العادي والكوبون الذكي" },
          { type: "paragraph", text: "الكوبون العادي: رمز ثابت يضعه التاجر يدوياً ويوزعه على الجميع. الكوبون الذكي في زيادة: يظهر تلقائياً لعميل محدد في لحظة محددة بناءً على قيمة سلته وسلوكه في المتجر." },
          { type: "heading", text: "أنواع شروط الكوبون" },
          { type: "list", items: [
            "شرط قيمة السلة: \"اصرف أكثر من 200 ⃁ واحصل على خصم 15%\"",
            "شرط الكمية: \"اشتر 3 قطع أو أكثر واحصل على القطعة الرابعة مجاناً\"",
            "شرط الفئة: \"أضف منتجاً من فئة العطور واحصل على خصم 10% على السلة\"",
            "شرط الوقت: \"خصم 20% في آخر 30 دقيقة قبل التخلي عن السلة\""
          ]},
          { type: "heading", text: "خطوات إعداد كوبون ذكي" },
          { type: "numbered", items: [
            "انتقل لقسم \"الكوبونات الذكية\" في لوحة تحكم زيادة",
            "انقر \"كوبون جديد\" واختر نوع الشرط",
            "حدد قيمة الخصم (نسبة مئوية أو مبلغ ثابت)",
            "ضع سقفاً لعدد مرات الاستخدام إذا أردت",
            "اربط الكوبون بحملة موجودة أو أنشئ حملة جديدة",
            "حدد نقطة الاقتراح: عادةً صفحة السلة للكوبونات",
            "انشر وراقب نتائج الكوبون في لوحة التحليلات"
          ]},
          { type: "tip", text: "الكوبونات الذكية الأكثر فعالية هي تلك التي تجعل العميل يضيف 20-30% فقط فوق قيمة سلته الحالية للحصول على الخصم. لا تجعل الشرط صعب التحقيق." },
          { type: "warning", text: "تنبيه: لا تستخدم أكثر من كوبونين ذكيين في نفس الوقت على نفس المتجر - قد يربك العميل ويقلل فعالية كليهما." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Smart coupons in Ziadah differ from regular store coupons — they are tied to customer behavior and activate automatically at the right moment for maximum impact." },
          { type: "heading", text: "Difference Between Regular and Smart Coupons" },
          { type: "paragraph", text: "Regular coupon: A fixed code the merchant creates manually and distributes to everyone. Smart coupon in Ziadah: Appears automatically for a specific customer at a specific moment based on their cart value and in-store behavior." },
          { type: "heading", text: "Types of Coupon Conditions" },
          { type: "list", items: [
            "Cart value condition: \"Spend more than 200 SAR and get 15% off\"",
            "Quantity condition: \"Buy 3 or more items and get the 4th free\"",
            "Category condition: \"Add a product from the Perfumes category and get 10% off the cart\"",
            "Time condition: \"20% off in the last 30 minutes before cart abandonment\""
          ]},
          { type: "heading", text: "Steps to Set Up a Smart Coupon" },
          { type: "numbered", items: [
            "Go to the \"Smart Coupons\" section in the Ziadah dashboard",
            "Click \"New Coupon\" and choose the condition type",
            "Set the discount value (percentage or fixed amount)",
            "Set a usage limit if desired",
            "Link the coupon to an existing campaign or create a new one",
            "Set the suggestion point: usually the cart page for coupons",
            "Publish and monitor coupon results in the analytics dashboard"
          ]},
          { type: "tip", text: "The most effective smart coupons are those that require the customer to add only 20–30% above their current cart value to get the discount. Don't make the condition too hard to achieve." },
          { type: "warning", text: "Warning: Don't use more than two smart coupons at the same time on the same store — it may confuse the customer and reduce the effectiveness of both." },
        ],
      },
      {
        id: "features-customization",
        categoryId: "features",
        title: "تخصيص شكل الاقتراحات في متجرك",
        titleEn: "Customizing Recommendation Appearance in Your Store",
        desc: "تغيير الألوان، النصوص، وطريقة عرض التوصيات لتناسب تصميم متجرك.",
        descEn: "Changing colors, text, and display style to match your store design.",
        time: "5 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "زيادة يتيح لك تخصيص شكل التوصيات بالكامل لتبدو كجزء طبيعي من تصميم متجرك وليس كإضافة خارجية. هذا يرفع نسبة التفاعل بشكل كبير." },
          { type: "heading", text: "خيارات التخصيص البصري" },
          { type: "list", items: [
            "الألوان: تغيير لون الزر والإطار والخلفية ليتناسب مع هوية علامتك",
            "الخطوط: استخدام نفس الخط المستخدم في متجرك",
            "الحجم والتباعد: تعديل حجم البطاقات والمسافات بينها",
            "الأيقونات: اختيار أيقونات مختلفة للسلة والتقييمات"
          ]},
          { type: "heading", text: "تخصيص النصوص" },
          { type: "paragraph", text: "يمكنك تغيير جميع النصوص التي تظهر في التوصيات بالعربي أو الإنجليزي أو كليهما. هذا مهم لمطابقة أسلوب متجرك." },
          { type: "list", items: [
            "عنوان قسم التوصيات: \"قد يعجبك أيضاً\" أو \"المنتجات المكملة\" أو أي عنوان تختاره",
            "نص زر الإضافة للسلة: \"أضف للسلة\" أو \"اشتر الآن\" أو \"احجز\"",
            "نص الحزمة: \"احصل على الكل\" أو \"الباقة الكاملة\"",
            "نص الكوبون: تخصيص رسالة العرض الخاصة"
          ]},
          { type: "heading", text: "التخصيص عبر CSS المتقدم" },
          { type: "paragraph", text: "للمتاجر التي تحتاج تحكماً أعمق، يوفر زيادة حقل CSS مخصص يتيح لك تعديل أي عنصر بصري بالضبط. هذا موجه للتجار الذين لديهم معرفة تقنية أو مطور." },
          { type: "tip", text: "ابدأ دائماً بتغيير لون الأزرار ليتطابق مع لون زر \"أضف للسلة\" في ثيمك الأساسي - هذا وحده يرفع نسبة النقر بنسبة ملحوظة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah allows you to fully customize the look of recommendations so they appear as a natural part of your store's design rather than an external add-on. This significantly increases engagement rates." },
          { type: "heading", text: "Visual Customization Options" },
          { type: "list", items: [
            "Colors: Change button, border, and background colors to match your brand identity",
            "Fonts: Use the same font used in your store",
            "Size and spacing: Adjust card sizes and spacing between them",
            "Icons: Choose different icons for the cart and ratings"
          ]},
          { type: "heading", text: "Text Customization" },
          { type: "paragraph", text: "You can change all text displayed in recommendations in Arabic, English, or both. This is important for matching your store's tone of voice." },
          { type: "list", items: [
            "Recommendation section title: \"You may also like\" or \"Complementary Products\" or any title you choose",
            "Add to cart button text: \"Add to Cart\" or \"Buy Now\" or \"Reserve\"",
            "Bundle text: \"Get All\" or \"Complete Package\"",
            "Coupon text: Customize the special offer message"
          ]},
          { type: "heading", text: "Advanced CSS Customization" },
          { type: "paragraph", text: "For stores that need deeper control, Ziadah provides a custom CSS field that allows you to modify any visual element precisely. This is intended for merchants with technical knowledge or a developer." },
          { type: "tip", text: "Always start by changing the button color to match the \"Add to Cart\" button color in your main theme — this alone noticeably increases the click-through rate." },
        ],
      },
      {
        id: "features-targeting",
        categoryId: "features",
        title: "إعداد قواعد الاستهداف المخصصة",
        titleEn: "Setting Up Custom Targeting Rules",
        desc: "تحديد شرائح عملاء معينة للحملات المخصصة بناءً على سلوكهم.",
        descEn: "Targeting specific customer segments for custom campaigns based on their behavior.",
        time: "9 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "قواعد الاستهداف تتيح لك إظهار توصيات مختلفة لعملاء مختلفين في نفس الوقت. العميل الجديد يرى توصيات مختلفة عن العميل المتكرر." },
          { type: "heading", text: "أنواع شرائح الاستهداف" },
          { type: "list", items: [
            "العميل الجديد: أول زيارة له في المتجر - يرى منتجات الأكثر مبيعاً",
            "العميل المتكرر: سبق له الشراء - يرى منتجات مكملة لمشترياته السابقة",
            "العميل بالموقع: عملاء من مدينة أو منطقة معينة",
            "العميل بالجهاز: عملاء الجوال يرون تصميماً مختلفاً عن عملاء الديسكتوب",
            "العميل بحجم السلة: عملاء سلتهم فوق 300 ⃁ يرون عروضاً مختلفة"
          ]},
          { type: "heading", text: "بناء قاعدة استهداف خطوة بخطوة" },
          { type: "numbered", items: [
            "من قسم \"الاستهداف\" في لوحة التحكم، انقر \"قاعدة جديدة\"",
            "حدد نوع الشريحة (الزائر الجديد، المتكرر، الخ)",
            "أضف شروطاً إضافية إن أردت (AND/OR)",
            "اختر الحملة التي ستطبق عليها هذه القاعدة",
            "حدد أولوية القاعدة إذا كانت هناك قواعد متعددة",
            "انشر واختبر بزيارة المتجر بمتصفح بدون ذاكرة تخزين (Incognito)"
          ]},
          { type: "heading", text: "أمثلة ناجحة على الاستهداف" },
          { type: "list", items: [
            "متجر ملابس: يظهر منتجات نسائية للعملاء اللواتي اشترين ملابس نسائية من قبل",
            "متجر إلكترونيات: يظهر إكسسوارات متوافقة مع الجوال الذي اشتراه العميل",
            "متجر طعام: يظهر مشروبات مكملة للوجبات التي طلبها العميل سابقاً"
          ]},
          { type: "tip", text: "ابدأ بقاعدتين فقط: \"عميل جديد\" و\"عميل متكرر\". هذا التقسيم البسيط يمكن أن يرفع نسبة التحويل بنسبة 20-35%." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Targeting rules allow you to show different recommendations to different customers at the same time. A new customer sees different recommendations than a returning customer." },
          { type: "heading", text: "Types of Targeting Segments" },
          { type: "list", items: [
            "New customer: First visit to the store — sees best-selling products",
            "Returning customer: Has purchased before — sees products complementary to their previous purchases",
            "Location-based customer: Customers from a specific city or region",
            "Device-based customer: Mobile users see a different design than desktop users",
            "Cart size customer: Customers with carts above 300 SAR see different offers"
          ]},
          { type: "heading", text: "Building a Targeting Rule Step by Step" },
          { type: "numbered", items: [
            "From the \"Targeting\" section in the dashboard, click \"New Rule\"",
            "Select the segment type (New visitor, Returning, etc.)",
            "Add additional conditions if needed (AND/OR)",
            "Choose the campaign this rule will apply to",
            "Set the rule priority if there are multiple rules",
            "Publish and test by visiting the store in an incognito browser"
          ]},
          { type: "heading", text: "Successful Targeting Examples" },
          { type: "list", items: [
            "Clothing store: Shows women's products to customers who previously bought women's clothing",
            "Electronics store: Shows accessories compatible with the phone the customer purchased",
            "Food store: Shows complementary beverages to meals the customer previously ordered"
          ]},
          { type: "tip", text: "Start with just two rules: \"New customer\" and \"Returning customer.\" This simple segmentation can increase conversion rates by 20–35%." },
        ],
      },
      {
        id: "features-touchpoints",
        categoryId: "features",
        title: "فهم نقاط الاقتراح الـ 9 ورحلة العميل",
        titleEn: "Understanding the 9 Suggestion Points and Customer Journey",
        desc: "أين تظهر التوصيات في كل خطوة من رحلة الشراء وكيف تحسينها.",
        descEn: "Where recommendations appear at each step of the purchase journey and how to optimize them.",
        time: "12 دقائق",
        timeEn: "6 min",
        sections: [
          { type: "paragraph", text: "زيادة يدعم 9 نقاط اقتراح مختلفة تغطي كامل رحلة العميل من دخول المتجر حتى ما بعد الشراء. كل نقطة لها وظيفة مختلفة وتأثير مختلف على المبيعات." },
          { type: "heading", text: "النقاط قبل الشراء (4 نقاط)" },
          { type: "list", items: [
            "1. الصفحة الرئيسية: أول لقاء مع العميل - أعرض المنتجات الأكثر مبيعاً أو المخصصة للعائدين",
            "2. صفحة التصنيف: العميل يبحث في فئة محددة - أقترح منتجات مشابهة أو إضافية",
            "3. صفحة المنتج: العميل مهتم بمنتج - أفضل مكان لـ Upsell وCross-sell",
            "4. صفحة البحث: العميل يبحث عن شيء محدد - ساعده في العثور عليه بشكل أسرع"
          ]},
          { type: "heading", text: "النقاط أثناء الشراء (3 نقاط)" },
          { type: "list", items: [
            "5. صفحة السلة: آخر فرصة لرفع القيمة قبل الدفع - ممتاز للـ Add-ons والكوبونات",
            "6. صفحة الدفع: تأكيد آخر لعناصر إضافية قبل إتمام الشراء",
            "7. نافذة الإضافة للسلة (Popup): يظهر لحظة إضافة منتج للسلة"
          ]},
          { type: "heading", text: "النقاط بعد الشراء (2 نقطتان)" },
          { type: "list", items: [
            "8. صفحة الشكر (Thank You): العميل في حالة رضا عاطفية - أفضل لتوصيات الشراء المتكرر",
            "9. بريد المتابعة: رسالة بريدية بعد 24-48 ساعة من الشراء"
          ]},
          { type: "heading", text: "استراتيجية استخدام النقاط" },
          { type: "paragraph", text: "لا تفعّل جميع النقاط في وقت واحد. ابدأ بصفحة المنتج وصفحة السلة، ثم أضف صفحة الشكر بعد أسبوعين. هذا يتيح لك دراسة تأثير كل نقطة بشكل منفصل." },
          { type: "tip", text: "صفحة الشكر هي من أكثر النقاط إهمالاً ومن أكثرها فعالية. العميل السعيد بشرائه مستعد للشراء مرة أخرى - لا تفوّت هذه الفرصة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah supports 9 different suggestion points covering the entire customer journey from entering the store to post-purchase. Each point has a different function and a different impact on sales." },
          { type: "heading", text: "Pre-Purchase Points (4 Points)" },
          { type: "list", items: [
            "1. Homepage: First encounter with the customer — display best sellers or personalized products for returning visitors",
            "2. Category Page: The customer is browsing a specific category — suggest similar or additional products",
            "3. Product Page: The customer is interested in a product — best place for Upsell and Cross-sell",
            "4. Search Page: The customer is searching for something specific — help them find it faster"
          ]},
          { type: "heading", text: "During Purchase Points (3 Points)" },
          { type: "list", items: [
            "5. Cart Page: Last chance to increase value before payment — excellent for Add-ons and coupons",
            "6. Checkout Page: Final confirmation for additional items before completing the purchase",
            "7. Add to Cart Popup: Appears the moment a product is added to the cart"
          ]},
          { type: "heading", text: "Post-Purchase Points (2 Points)" },
          { type: "list", items: [
            "8. Thank You Page: The customer is in a state of emotional satisfaction — best for repeat purchase recommendations",
            "9. Follow-up Email: An email sent 24–48 hours after purchase"
          ]},
          { type: "heading", text: "Point Usage Strategy" },
          { type: "paragraph", text: "Don't activate all points at once. Start with the product page and cart page, then add the thank you page after two weeks. This allows you to study each point's impact separately." },
          { type: "tip", text: "The thank you page is one of the most neglected yet most effective points. A customer happy with their purchase is ready to buy again — don't miss this opportunity." },
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "الذكاء الاصطناعي",
    labelEn: "Artificial Intelligence",
    color: "#8b5cf6",
    icon: "🤖",
    articles: [
      {
        id: "ai-learn",
        categoryId: "ai",
        title: "كيف يتعلم الذكاء الاصطناعي على عملائك؟",
        titleEn: "How Does AI Learn About Your Customers?",
        desc: "شرح مبسط لآلية التعلم الآلي وكيف يتحسن النظام مع كل طلب.",
        descEn: "Simple explanation of the machine learning mechanism and how the system improves with every order.",
        time: "7 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "الذكاء الاصطناعي في زيادة ليس مجرد قواعد برمجية ثابتة - إنه نظام يتعلم ويتطور باستمرار بناءً على بيانات متجرك الفريدة. فهم كيف يعمل يساعدك على استخدامه بشكل أذكى." },
          { type: "heading", text: "مرحلة جمع البيانات" },
          { type: "paragraph", text: "في كل زيارة لمتجرك، يرصد النظام بهدوء: ماذا شاهد العميل؟ ماذا أضاف للسلة؟ ماذا اشترى في النهاية؟ ماذا تجاهل؟ هذه البيانات تُحفظ بشكل مجهول الهوية تماماً." },
          { type: "heading", text: "مرحلة بناء النموذج" },
          { type: "paragraph", text: "النظام يبحث عن أنماط مشتركة: \"العملاء الذين اشتروا A غالباً اشتروا B أيضاً\". هذا يسمى Collaborative Filtering. كلما زادت البيانات، كلما اكتشف النظام أنماطاً أدق وأكثر تخصيصاً." },
          { type: "heading", text: "مرحلة التوصية" },
          { type: "paragraph", text: "عندما يزور عميل جديد متجرك، يقارن النظام سلوكه الحالي مع ملايين الأنماط المحفوظة، ثم يختار التوصية الأكثر احتمالاً للنجاح في ثوانٍ." },
          { type: "heading", text: "التحسين المستمر" },
          { type: "paragraph", text: "بعد كل توصية، يتعلم النظام من النتيجة: هل نقر العميل؟ هل اشترى؟ إذا لم يفعل، ماذا فعل بدلاً من ذلك؟ هذا التغذية الراجعة تجعل النظام أذكى مع مرور الوقت." },
          { type: "tip", text: "نصيحة: متجرك الذي لديه 100 طلب شهرياً سيحصل على توصيات أدق بكثير من متجر لديه 10 طلبات. ركّز على زيادة حجم الطلبات عموماً لتحسين جودة الذكاء الاصطناعي." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "The AI in Ziadah is not just a set of fixed programming rules — it is a system that continuously learns and evolves based on your store's unique data. Understanding how it works helps you use it more intelligently." },
          { type: "heading", text: "Data Collection Phase" },
          { type: "paragraph", text: "During every visit to your store, the system quietly tracks: What did the customer view? What did they add to the cart? What did they ultimately buy? What did they ignore? This data is stored in a completely anonymous manner." },
          { type: "heading", text: "Model Building Phase" },
          { type: "paragraph", text: "The system looks for common patterns: \"Customers who bought A usually also bought B.\" This is called Collaborative Filtering. The more data there is, the more precise and personalized patterns the system discovers." },
          { type: "heading", text: "Recommendation Phase" },
          { type: "paragraph", text: "When a new customer visits your store, the system compares their current behavior with millions of stored patterns, then selects the most likely successful recommendation in seconds." },
          { type: "heading", text: "Continuous Improvement" },
          { type: "paragraph", text: "After every recommendation, the system learns from the result: Did the customer click? Did they buy? If not, what did they do instead? This feedback makes the system smarter over time." },
          { type: "tip", text: "Tip: A store with 100 monthly orders will get much more accurate recommendations than a store with 10 orders. Focus on increasing overall order volume to improve AI quality." },
        ],
      },
      {
        id: "ai-data",
        categoryId: "ai",
        title: "البيانات التي يحللها النظام",
        titleEn: "Data the System Analyzes",
        desc: "قائمة كاملة بالإشارات التي يستخدمها AI: الموقع، الجهاز، السلوك، التاريخ.",
        descEn: "Complete list of signals AI uses: location, device, behavior, history.",
        time: "6 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "الذكاء الاصطناعي في زيادة لا يقتصر على تاريخ الشراء فقط - بل يحلل عشرات الإشارات في آنٍ واحد لتكون التوصية دقيقة في الوقت المناسب لكل عميل." },
          { type: "heading", text: "إشارات السلوك الآني (Real-time)" },
          { type: "list", items: [
            "الصفحات التي زارها في هذه الجلسة",
            "المنتجات التي شاهدها وكم وقتاً قضى عليها",
            "ما أضافه للسلة وما أزاله",
            "مصدر الزيارة (بحث جوجل، سوشيال ميديا، مباشر)",
            "الكلمات التي بحث عنها داخل المتجر"
          ]},
          { type: "heading", text: "إشارات الجهاز والبيئة" },
          { type: "list", items: [
            "نوع الجهاز (جوال، تابلت، كمبيوتر)",
            "الوقت من اليوم والتاريخ",
            "المنطقة الجغرافية التقريبية (المدينة)",
            "اللغة المفضلة",
            "نوع الاتصال بالإنترنت"
          ]},
          { type: "heading", text: "إشارات التاريخ (للعملاء المتكررين)" },
          { type: "list", items: [
            "قائمة المشتريات السابقة وتواريخها",
            "المنتجات التي شاهدها لكن لم يشترها",
            "متوسط قيمة طلباته",
            "تكرار الشراء ومدة الغياب",
            "الفئات التي يشتري منها أكثر"
          ]},
          { type: "heading", text: "إشارات المنتجات" },
          { type: "list", items: [
            "أسماء المنتجات وأوصافها",
            "فئات المنتجات والوسوم",
            "الأسعار وهوامش الربح",
            "مستوى المخزون",
            "تقييمات العملاء"
          ]},
          { type: "warning", text: "لا نجمع أي بيانات شخصية تعريفية مثل الاسم أو رقم الجوال أو بريد العميل دون موافقته الصريحة. جميع الإشارات مجهولة الهوية." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "The AI in Ziadah doesn't rely on purchase history alone — it analyzes dozens of signals simultaneously to deliver accurate recommendations at the right time for each customer." },
          { type: "heading", text: "Real-time Behavior Signals" },
          { type: "list", items: [
            "Pages visited during this session",
            "Products viewed and how much time was spent on each",
            "What was added to and removed from the cart",
            "Visit source (Google search, social media, direct)",
            "Search terms used within the store"
          ]},
          { type: "heading", text: "Device and Environment Signals" },
          { type: "list", items: [
            "Device type (mobile, tablet, computer)",
            "Time of day and date",
            "Approximate geographic region (city)",
            "Preferred language",
            "Internet connection type"
          ]},
          { type: "heading", text: "Historical Signals (for Returning Customers)" },
          { type: "list", items: [
            "List of previous purchases and their dates",
            "Products viewed but not purchased",
            "Average order value",
            "Purchase frequency and absence duration",
            "Most frequently purchased categories"
          ]},
          { type: "heading", text: "Product Signals" },
          { type: "list", items: [
            "Product names and descriptions",
            "Product categories and tags",
            "Prices and profit margins",
            "Inventory levels",
            "Customer ratings"
          ]},
          { type: "warning", text: "We do not collect any personally identifiable information such as names, phone numbers, or customer emails without their explicit consent. All signals are anonymized." },
        ],
      },
      {
        id: "ai-time",
        categoryId: "ai",
        title: "كم وقت يحتاج الذكاء الاصطناعي ليتعلم؟",
        titleEn: "How Long Does AI Need to Learn?",
        desc: "مراحل التعلم ومتى تبدأ النتائج تتحسن بشكل ملحوظ.",
        descEn: "Learning stages and when results start to noticeably improve.",
        time: "4 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "أحد الأسئلة الأكثر شيوعاً من التجار الجدد: \"متى سأرى فرقاً حقيقياً في مبيعاتي؟\" الإجابة تعتمد على حجم نشاط متجرك، لكن هذا التقسيم الزمني يعطيك توقعات واقعية." },
          { type: "heading", text: "الأسبوع الأول: مرحلة البيانات الأولية" },
          { type: "paragraph", text: "التوصيات تعمل وتظهر للعملاء، لكن الذكاء الاصطناعي يعتمد على البيانات العامة (الفئات والأسماء) أكثر من الأنماط الفعلية لمتجرك. نتائج جيدة لكن ليست الأفضل." },
          { type: "heading", text: "الأسبوع 2-4: مرحلة التعلم المتسارع" },
          { type: "paragraph", text: "بعد أول 50-100 طلب، يبدأ النظام بتعلم أنماط خاصة بعملاء متجرك. ستلاحظ ارتفاعاً ملحوظاً في دقة التوصيات ونسبة النقر." },
          { type: "heading", text: "الشهر الثاني: مرحلة الاستقرار والتحسين" },
          { type: "paragraph", text: "الذكاء الاصطناعي يكون قد تعلّم أهم 80% من أنماط متجرك. التوصيات أصبحت دقيقة للغاية ويمكنك الآن التجربة والمقارنة بين الإعدادات المختلفة." },
          { type: "heading", text: "الشهر الثالث فصاعداً: مرحلة التحسين المستمر" },
          { type: "paragraph", text: "النظام يتكيف مع التغيرات الموسمية ويتعلم من المناسبات والعروض. هذه هي المرحلة التي ترى فيها أفضل النتائج." },
          { type: "list", items: [
            "أقل من 50 طلباً شهرياً: انتظر شهرين للحكم على الأداء",
            "50-200 طلب شهرياً: شهر كافٍ للحصول على نتائج واضحة",
            "فوق 200 طلب شهرياً: أسبوعان كافيان لملاحظة فرق ملحوظ"
          ]},
          { type: "tip", text: "لتسريع التعلم: أضف أوصافاً تفصيلية لأكثر 100 منتج مبيعاً، وتأكد من دقة تصنيف الفئات." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "One of the most common questions from new merchants: \"When will I see a real difference in my sales?\" The answer depends on your store's activity level, but this timeline gives you realistic expectations." },
          { type: "heading", text: "Week 1: Initial Data Phase" },
          { type: "paragraph", text: "Recommendations are working and appearing to customers, but the AI relies more on general data (categories and names) than on actual patterns from your store. Good results, but not the best." },
          { type: "heading", text: "Weeks 2–4: Accelerated Learning Phase" },
          { type: "paragraph", text: "After the first 50–100 orders, the system begins learning patterns specific to your store's customers. You'll notice a noticeable improvement in recommendation accuracy and click-through rates." },
          { type: "heading", text: "Month 2: Stabilization and Optimization Phase" },
          { type: "paragraph", text: "The AI has learned the most important 80% of your store's patterns. Recommendations are now highly accurate and you can experiment and compare different settings." },
          { type: "heading", text: "Month 3 Onward: Continuous Improvement Phase" },
          { type: "paragraph", text: "The system adapts to seasonal changes and learns from events and promotions. This is the stage where you see the best results." },
          { type: "list", items: [
            "Less than 50 monthly orders: Wait two months before judging performance",
            "50–200 monthly orders: One month is sufficient for clear results",
            "Above 200 monthly orders: Two weeks are enough to notice a significant difference"
          ]},
          { type: "tip", text: "To accelerate learning: Add detailed descriptions for your top 100 best-selling products and ensure category classifications are accurate." },
        ],
      },
      {
        id: "ai-interpret",
        categoryId: "ai",
        title: "تفسير توصيات الذكاء الاصطناعي",
        titleEn: "Interpreting AI Recommendations",
        desc: "كيف تقرأ سبب اقتراح الذكاء الاصطناعي لمنتج معين لعميل بعينه.",
        descEn: "How to understand why AI suggested a specific product to a specific customer.",
        time: "8 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "زيادة يتيح لك رؤية \"سبب\" كل توصية - لماذا اقترح النظام منتجاً معيناً لعميل معين. هذه الشفافية تساعدك على فهم النظام والثقة في قراراته." },
          { type: "heading", text: "أنواع أسباب التوصية" },
          { type: "list", items: [
            "\"اشتراه عملاء مشابهون\": العملاء الذين اشتروا نفس المنتج اشتروا هذا أيضاً",
            "\"يكمل مشترياتك السابقة\": يتناسب مع ما اشتراه هذا العميل من قبل",
            "\"من نفس الفئة المفضلة\": العميل يتصفح دائماً هذه الفئة",
            "\"الأكثر مبيعاً في وقتك\": يباع كثيراً في نفس وقت الزيارة",
            "\"مكمل للمنتج الحالي\": يعمل بشكل مثالي مع ما يشاهده العميل الآن"
          ]},
          { type: "heading", text: "كيف تقرأ تقرير توضيح التوصيات" },
          { type: "numbered", items: [
            "من لوحة التحكم، انتقل لـ \"تفاصيل التوصيات\"",
            "اختر أي حملة وانقر على \"تحليل توصيات\"",
            "سترى قائمة بأكثر المنتجات المقترحة مع سبب كل توصية",
            "ابحث عن توصيات تبدو \"غريبة\" - هذه تستحق الدراسة",
            "إذا رأيت توصية لا تناسب متجرك، يمكنك استبعاد منتجات محددة من التوصيات"
          ]},
          { type: "heading", text: "التدخل اليدوي في التوصيات" },
          { type: "paragraph", text: "أحياناً قد تعرف أنت أفضل من الذكاء الاصطناعي - مثلاً تعرف أن منتجين يُباعان معاً دائماً في ثقافتك المحلية لكن النظام لم يكتشف ذلك بعد. يمكنك ربط المنتجات يدوياً وتجاوز التوصيات التلقائية." },
          { type: "tip", text: "راجع تقرير التوصيات أسبوعياً في أول شهرين. بعد ذلك، مراجعة شهرية كافية." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah allows you to see the \"reason\" behind each recommendation — why the system suggested a specific product to a specific customer. This transparency helps you understand the system and trust its decisions." },
          { type: "heading", text: "Types of Recommendation Reasons" },
          { type: "list", items: [
            "\"Bought by similar customers\": Customers who bought the same product also bought this",
            "\"Complements your previous purchases\": Matches what this customer has bought before",
            "\"From your favorite category\": The customer frequently browses this category",
            "\"Best seller at your time\": Sells frequently at the same time of visit",
            "\"Complements the current product\": Works perfectly with what the customer is currently viewing"
          ]},
          { type: "heading", text: "How to Read the Recommendation Explanation Report" },
          { type: "numbered", items: [
            "From the dashboard, navigate to \"Recommendation Details\"",
            "Select any campaign and click \"Analyze Recommendations\"",
            "You'll see a list of the most suggested products with the reason for each recommendation",
            "Look for recommendations that seem \"odd\" — these deserve investigation",
            "If you see a recommendation that doesn't suit your store, you can exclude specific products from recommendations"
          ]},
          { type: "heading", text: "Manual Intervention in Recommendations" },
          { type: "paragraph", text: "Sometimes you may know better than the AI — for example, you know that two products always sell together in your local culture but the system hasn't discovered this yet. You can manually link products and override automatic recommendations." },
          { type: "tip", text: "Review the recommendation report weekly during the first two months. After that, a monthly review is sufficient." },
        ],
      },
      {
        id: "ai-privacy",
        categoryId: "ai",
        title: "الخصوصية وحماية بيانات العملاء",
        titleEn: "Privacy and Customer Data Protection",
        desc: "ما البيانات التي نجمعها وكيف نحميها وفق لوائح حماية البيانات.",
        descEn: "What data we collect and how we protect it according to data protection regulations.",
        time: "5 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "الخصوصية ليست مجرد التزام قانوني لدينا - بل ركيزة أساسية في تصميم زيادة. فهم سياسة الخصوصية يساعدك في الإجابة عن أسئلة عملائك بثقة." },
          { type: "heading", text: "ما الذي نجمعه" },
          { type: "list", items: [
            "بيانات سلوك التصفح: مجهولة الهوية تماماً بدون اسم أو بريد",
            "معرّفات مجهولة: رمز عشوائي لكل جهاز لا يمكن ربطه بشخص حقيقي",
            "بيانات المنتجات والمشتريات: من كتالوج متجرك فقط",
            "بيانات الجهاز والموقع التقريبي: على مستوى المدينة فقط، لا مكان دقيق"
          ]},
          { type: "heading", text: "ما الذي لا نجمعه أبداً" },
          { type: "list", items: [
            "أسماء العملاء أو أرقام هواتفهم",
            "بيانات بطاقات الدفع",
            "بيانات تسجيل الدخول أو كلمات المرور",
            "العنوان الدقيق للمنزل أو الموقع"
          ]},
          { type: "heading", text: "الامتثال القانوني" },
          { type: "paragraph", text: "زيادة مصمم للامتثال مع: نظام حماية البيانات الشخصية السعودي (PDPL)، ولوائح حماية البيانات الخليجية، والإطار العام لـ GDPR للمتاجر التي لها عملاء أوروبيون." },
          { type: "heading", text: "حق الحذف وإدارة البيانات" },
          { type: "paragraph", text: "يحق لأي عميل لديك طلب حذف بياناته. يمكنك إجراء ذلك من لوحة تحكم زيادة في قسم إدارة البيانات. البيانات تُحذف خلال 72 ساعة." },
          { type: "tip", text: "أضف فقرة في صفحة سياسة الخصوصية في متجرك تذكر استخدامك لزيادة كأداة توصيات وكيف تحمي بيانات عملائك. هذا يبني ثقة إضافية مع عملائك." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Privacy is not just a legal obligation for us — it is a fundamental pillar in Ziadah's design. Understanding the privacy policy helps you answer your customers' questions with confidence." },
          { type: "heading", text: "What We Collect" },
          { type: "list", items: [
            "Browsing behavior data: Completely anonymous without name or email",
            "Anonymous identifiers: A random code for each device that cannot be linked to a real person",
            "Product and purchase data: From your store catalog only",
            "Device and approximate location data: At the city level only, no precise location"
          ]},
          { type: "heading", text: "What We Never Collect" },
          { type: "list", items: [
            "Customer names or phone numbers",
            "Payment card details",
            "Login credentials or passwords",
            "Exact home address or precise location"
          ]},
          { type: "heading", text: "Legal Compliance" },
          { type: "paragraph", text: "Ziadah is designed to comply with: Saudi Arabia's Personal Data Protection Law (PDPL), Gulf data protection regulations, and the GDPR framework for stores with European customers." },
          { type: "heading", text: "Right to Deletion and Data Management" },
          { type: "paragraph", text: "Any of your customers has the right to request data deletion. You can do this from the Ziadah dashboard in the Data Management section. Data is deleted within 72 hours." },
          { type: "tip", text: "Add a paragraph to your store's privacy policy page mentioning your use of Ziadah as a recommendation tool and how you protect customer data. This builds additional trust with your customers." },
        ],
      },
      {
        id: "ai-improve",
        categoryId: "ai",
        title: "رفع دقة التوصيات يدوياً",
        titleEn: "Manually Improving Recommendation Accuracy",
        desc: "نصائح لتحسين جودة التوصيات من خلال ربط الفئات والمنتجات بشكل أفضل.",
        descEn: "Tips for improving recommendation quality through better category and product linking.",
        time: "9 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "رغم قوة الذكاء الاصطناعي، هناك إجراءات بسيطة تستطيع أن تفعلها لمساعدة النظام وتوجيهه نحو توصيات أدق وأكثر ملاءمة لطبيعة متجرك." },
          { type: "heading", text: "تحسين بنية الفئات" },
          { type: "paragraph", text: "الفئات الواضحة والمنطقية تساعد الذكاء الاصطناعي في فهم العلاقات بين المنتجات بشكل أفضل. منتج في فئة خاطئة سيحصل على توصيات خاطئة." },
          { type: "numbered", items: [
            "راجع كل فئة ة في متجرك وتأكد من أن جميع منتجاتها منتمية فعلاً لها",
            "أنشئ فئات فرعية إذا كانت الفئة الرئيسية تضم أنواعاً مختلفة جداً",
            "أضف وسوم مشتركة للمنتجات المترابطة حتى لو كانت في فئات مختلفة",
            "احذف الفئات الفارغة أو التي تضم منتجاً واحداً فقط"
          ]},
          { type: "heading", text: "تحسين أوصاف المنتجات" },
          { type: "list", items: [
            "اذكر صراحة \"مناسب مع\" أو \"يكمل\" في الوصف",
            "أضف مواد التصنيع والمقاسات والاستخدامات",
            "استخدم نفس الكلمات المفتاحية للمنتجات المترابطة",
            "أضف أسماء بديلة شائعة للمنتج إذا وُجدت"
          ]},
          { type: "heading", text: "الربط اليدوي للمنتجات" },
          { type: "paragraph", text: "في لوحة تحكم زيادة، قسم \"إدارة العلاقات\" يتيح لك ربط منتجات محددة ببعضها يدوياً. هذا يُعطى أولوية على توصيات الذكاء الاصطناعي التلقائية ومفيد لـ:" },
          { type: "list", items: [
            "المنتجات المكملة إلزامياً (مثل شاحن + جوال)",
            "العروض الترويجية الخاصة لفترة محدودة",
            "حزم المنتجات المصممة مسبقاً"
          ]},
          { type: "heading", text: "استبعاد منتجات من التوصيات" },
          { type: "paragraph", text: "بعض المنتجات لا ينبغي توصيتها معاً. مثلاً: منتجات الأطفال لا ينبغي توصيتها مع منتجات للكبار. في إعدادات الاستبعاد، يمكنك منع فئات أو منتجات معينة من الظهور معاً." },
          { type: "tip", text: "خصص 30 دقيقة أسبوعياً لمراجعة \"تقرير التوصيات غير المنطقية\" في لوحة التحكم. إصلاح 10 توصيات خاطئة قد يرفع نسبة التحويل الكلية بشكل ملحوظ." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Despite the AI's power, there are simple actions you can take to help guide the system toward more accurate and relevant recommendations for your store's nature." },
          { type: "heading", text: "Improving Category Structure" },
          { type: "paragraph", text: "Clear and logical categories help the AI better understand relationships between products. A product in the wrong category will get wrong recommendations." },
          { type: "numbered", items: [
            "Review every category in your store and ensure all products truly belong to it",
            "Create subcategories if a main category contains very different types",
            "Add shared tags for related products even if they're in different categories",
            "Delete empty categories or those containing only one product"
          ]},
          { type: "heading", text: "Improving Product Descriptions" },
          { type: "list", items: [
            "Explicitly mention \"pairs well with\" or \"complements\" in the description",
            "Add manufacturing materials, sizes, and usage details",
            "Use the same keywords for related products",
            "Add common alternative names for the product if they exist"
          ]},
          { type: "heading", text: "Manual Product Linking" },
          { type: "paragraph", text: "In the Ziadah dashboard, the \"Relationship Management\" section allows you to manually link specific products together. This takes priority over automatic AI recommendations and is useful for:" },
          { type: "list", items: [
            "Mandatorily complementary products (e.g., charger + phone)",
            "Special promotional offers for a limited time",
            "Pre-designed product bundles"
          ]},
          { type: "heading", text: "Excluding Products from Recommendations" },
          { type: "paragraph", text: "Some products shouldn't be recommended together. For example: children's products shouldn't be recommended with adult products. In the exclusion settings, you can prevent specific categories or products from appearing together." },
          { type: "tip", text: "Dedicate 30 minutes weekly to reviewing the \"Illogical Recommendations Report\" in the dashboard. Fixing 10 incorrect recommendations can noticeably increase your overall conversion rate." },
        ],
      },
    ],
  },
  {
    id: "billing",
    label: "الأسعار والفواتير",
    labelEn: "Pricing & Billing",
    color: "#f59e0b",
    icon: "💳",
    articles: [
      {
        id: "billing-plans",
        categoryId: "billing",
        title: "مقارنة الباقات الأربع بالتفصيل",
        titleEn: "Comparing the Four Plans in Detail",
        desc: "ما الذي تحصل عليه في كل باقة وكيف تختار المناسب لحجم متجرك.",
        descEn: "What you get in each plan and how to choose the right one for your store size.",
        time: "6 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "زيادة يقدم أربع باقات مصممة لمراحل نمو مختلفة. اختيار الباقة الصحيحة يضمن أنك تدفع فقط مقابل ما تحتاجه فعلاً." },
          { type: "heading", text: "باقة النمو (Starter)" },
          { type: "paragraph", text: "مثالية للمتاجر الجديدة أو الصغيرة. تمنحك الأدوات الأساسية لبدء التوصيات الذكية دون تعقيد." },
          { type: "list", items: [
            "حتى 1000 منتج",
            "3 حملات نشطة في وقت واحد",
            "4 نقاط اقتراح",
            "لوحة تحليلات أساسية",
            "دعم عبر البريد الإلكتروني"
          ]},
          { type: "heading", text: "باقة الأعمال (Business)" },
          { type: "paragraph", text: "للمتاجر في مرحلة النمو التي تريد استغلال كامل قوة الذكاء الاصطناعي." },
          { type: "list", items: [
            "حتى 5000 منتج",
            "10 حملات نشطة",
            "جميع النقاط الـ 9",
            "قواعد الاستهداف المخصصة",
            "تقارير متقدمة",
            "دعم أولوي عبر واتساب"
          ]},
          { type: "heading", text: "باقة النخبة (Pro)" },
          { type: "paragraph", text: "للمتاجر الكبيرة التي تريد التحكم الكامل وأقصى قدر من التخصيص." },
          { type: "list", items: [
            "منتجات غير محدودة",
            "حملات غير محدودة",
            "API للتكامل المخصص",
            "مدير حساب مخصص",
            "اختبار A/B متقدم",
            "تقارير مخصصة"
          ]},
          { type: "heading", text: "باقة المؤسسات (Enterprise)" },
          { type: "paragraph", text: "للمتاجر متعددة الفروع والمجموعات التجارية الكبرى مع احتياجات خاصة." },
          { type: "list", items: [
            "متاجر متعددة من لوحة تحكم واحدة",
            "SLA مخصص",
            "تكامل API مخصص",
            "تدريب الفريق",
            "اتفاقية خصوصية مخصصة"
          ]},
          { type: "tip", text: "إذا كنت غير متأكد، ابدأ بالباقة الأدنى لمدة شهر. الترقية سهلة وفورية، ولن تفقد أي بيانات أو إعدادات." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah offers four plans designed for different growth stages. Choosing the right plan ensures you only pay for what you actually need." },
          { type: "heading", text: "Starter Plan" },
          { type: "paragraph", text: "Ideal for new or small stores. Gives you the essential tools to start smart recommendations without complexity." },
          { type: "list", items: [
            "Up to 1,000 products",
            "3 active campaigns at a time",
            "4 suggestion points",
            "Basic analytics dashboard",
            "Email support"
          ]},
          { type: "heading", text: "Business Plan" },
          { type: "paragraph", text: "For growing stores that want to leverage the full power of AI." },
          { type: "list", items: [
            "Up to 5,000 products",
            "10 active campaigns",
            "All 9 suggestion points",
            "Custom targeting rules",
            "Advanced reports",
            "Priority WhatsApp support"
          ]},
          { type: "heading", text: "Pro Plan" },
          { type: "paragraph", text: "For large stores that want full control and maximum customization." },
          { type: "list", items: [
            "Unlimited products",
            "Unlimited campaigns",
            "API for custom integration",
            "Dedicated account manager",
            "Advanced A/B testing",
            "Custom reports"
          ]},
          { type: "heading", text: "Enterprise Plan" },
          { type: "paragraph", text: "For multi-branch stores and large business groups with special requirements." },
          { type: "list", items: [
            "Multiple stores from a single dashboard",
            "Custom SLA",
            "Custom API integration",
            "Team training",
            "Custom privacy agreement"
          ]},
          { type: "tip", text: "If you're unsure, start with the lowest plan for a month. Upgrading is easy and instant, and you won't lose any data or settings." },
        ],
      },
      {
        id: "billing-monthly-annual",
        categoryId: "billing",
        title: "الفرق بين الاشتراك الشهري والسنوي",
        titleEn: "Monthly vs. Annual Subscription Difference",
        desc: "حساب التوفير السنوي وكيف يعمل التحويل بين الباقتين.",
        descEn: "Annual savings calculation and how switching between the two works.",
        time: "3 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "يمكنك الاشتراك في زيادة على أساس شهري أو سنوي. كلاهما يمنحك نفس الخصائص، لكن الاشتراك السنوي يوفر عليك مبلغاً ملحوظاً." },
          { type: "heading", text: "التوفير في الاشتراك السنوي" },
          { type: "paragraph", text: "الاشتراك السنوي يوفر خصماً يعادل شهرين مجانيين مقارنة بالدفع الشهري. بمعنى آخر، تدفع مقابل 10 أشهر وتحصل على 12 شهراً كاملاً." },
          { type: "heading", text: "متى تختار الشهري؟" },
          { type: "list", items: [
            "إذا كنت في فترة تجريبية وغير متأكد من الاستمرار",
            "إذا كان نشاط متجرك موسمياً (رمضان، الأعياد)",
            "إذا كنت تجرب زيادة للمرة الأولى"
          ]},
          { type: "heading", text: "متى تختار السنوي؟" },
          { type: "list", items: [
            "إذا كنت متأكداً من رغبتك في الاستمرار بعد الشهر الأول",
            "إذا كان متجرك نشطاً على مدار السنة",
            "إذا أردت تقليل الأعباء الإدارية للتجديد الشهري"
          ]},
          { type: "heading", text: "التحويل من شهري لسنوي" },
          { type: "paragraph", text: "يمكنك الترقية للاشتراك السنوي في أي وقت من لوحة التحكم. الرصيد المتبقي من اشتراكك الشهري يُحتسب تلقائياً ويُخفض من قيمة الاشتراك السنوي." },
          { type: "heading", text: "التحويل من سنوي لشهري" },
          { type: "paragraph", text: "يمكنك التحويل للاشتراك الشهري عند انتهاء سنتك الحالية. لا يمكن الانتقال للشهري خلال فترة الاشتراك السنوي قبل انتهائها، لكن يمكنك إيقاف التجديد التلقائي." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "You can subscribe to Ziadah on a monthly or annual basis. Both give you the same features, but the annual subscription saves you a noticeable amount." },
          { type: "heading", text: "Annual Subscription Savings" },
          { type: "paragraph", text: "The annual subscription offers a discount equivalent to two free months compared to monthly payments. In other words, you pay for 10 months and get a full 12 months." },
          { type: "heading", text: "When to Choose Monthly?" },
          { type: "list", items: [
            "If you're in a trial period and not sure about continuing",
            "If your store activity is seasonal (Ramadan, holidays)",
            "If you're trying Ziadah for the first time"
          ]},
          { type: "heading", text: "When to Choose Annual?" },
          { type: "list", items: [
            "If you're confident about continuing after the first month",
            "If your store is active year-round",
            "If you want to reduce the administrative burden of monthly renewals"
          ]},
          { type: "heading", text: "Switching from Monthly to Annual" },
          { type: "paragraph", text: "You can upgrade to the annual subscription at any time from the dashboard. The remaining balance from your monthly subscription is automatically calculated and deducted from the annual subscription cost." },
          { type: "heading", text: "Switching from Annual to Monthly" },
          { type: "paragraph", text: "You can switch to a monthly subscription when your current year ends. You cannot switch to monthly during the annual subscription period before it expires, but you can stop automatic renewal." },
        ],
      },
      {
        id: "billing-invoice",
        categoryId: "billing",
        title: "كيف تُحتسب الفاتورة الشهرية؟",
        titleEn: "How Is the Monthly Invoice Calculated?",
        desc: "توضيح آلية الاحتساب وتاريخ التجديد والرسوم المشمولة بالضريبة.",
        descEn: "Explanation of the calculation method, renewal date, and VAT-inclusive fees.",
        time: "4 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "الفاتورة في زيادة بسيطة وشفافة. لا رسوم خفية ولا مفاجآت. هذا دليل كامل لفهم كيف تُحتسب وتُرسل فاتورتك." },
          { type: "heading", text: "تاريخ الاحتساب" },
          { type: "paragraph", text: "تُجدَّد الفاتورة في نفس تاريخ الاشتراك الأول من كل شهر. مثلاً إذا اشتركت في 15 مارس، فاتورتك التالية ستصدر في 15 أبريل." },
          { type: "heading", text: "ما يشمله الاشتراك" },
          { type: "list", items: [
            "رسوم الباقة الأساسية",
            "جميع الخصائص المدرجة في الباقة المختارة",
            "التحديثات والميزات الجديدة تلقائياً",
            "الدعم الفني وفق مستوى الباقة"
          ]},
          { type: "heading", text: "ضريبة القيمة المضافة" },
          { type: "paragraph", text: "الأسعار المعروضة في صفحة الأسعار لا تشمل ضريبة القيمة المضافة (15% في المملكة العربية السعودية). ستظهر الضريبة بشكل منفصل في فاتورتك." },
          { type: "heading", text: "استلام الفواتير" },
          { type: "paragraph", text: "تُرسل الفاتورة تلقائياً للبريد الإلكتروني المسجل بعد كل عملية خصم. يمكنك تنزيل جميع فواتيرك السابقة من قسم \"الفواتير\" في لوحة التحكم بصيغة PDF." },
          { type: "tip", text: "إذا كنت تحتاج الفاتورة باسم شركتك ورقم السجل التجاري، يمكنك إضافة هذه البيانات في إعدادات الحساب وستُدرج في جميع فواتيرك القادمة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Invoicing in Ziadah is simple and transparent. No hidden fees, no surprises. Here is a complete guide to understanding how your invoice is calculated and sent." },
          { type: "heading", text: "Billing Date" },
          { type: "paragraph", text: "The invoice is renewed on the same date as your original subscription each month. For example, if you subscribed on March 15, your next invoice will be issued on April 15." },
          { type: "heading", text: "What the Subscription Includes" },
          { type: "list", items: [
            "Base plan fees",
            "All features included in the selected plan",
            "Updates and new features automatically",
            "Technical support according to plan level"
          ]},
          { type: "heading", text: "Value Added Tax" },
          { type: "paragraph", text: "Prices shown on the pricing page do not include VAT (15% in Saudi Arabia). Tax will appear separately on your invoice." },
          { type: "heading", text: "Receiving Invoices" },
          { type: "paragraph", text: "Invoices are automatically sent to the registered email after each charge. You can download all your previous invoices from the \"Invoices\" section in the dashboard in PDF format." },
          { type: "tip", text: "If you need the invoice in your company name with the commercial registration number, you can add this information in account settings and it will be included in all future invoices." },
        ],
      },
      {
        id: "billing-upgrade",
        categoryId: "billing",
        title: "الترقية أو الخفض بين الباقات",
        titleEn: "Upgrading or Downgrading Between Plans",
        desc: "كيف تغير باقتك في أي وقت وما يحدث للرصيد المتبقي.",
        descEn: "How to change your plan at any time and what happens to the remaining balance.",
        time: "3 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "زيادة يتيح لك تغيير باقتك في أي وقت بشكل مرن. سواء أردت الترقية لباقة أعلى أو الخفض لباقة أدنى، العملية سلسة وبدون تعقيدات." },
          { type: "heading", text: "الترقية لباقة أعلى" },
          { type: "paragraph", text: "الترقية فورية. بمجرد تأكيدها، تحصل على جميع مميزات الباقة الجديدة فوراً. الرصيد المتبقي من باقتك الحالية يُحوَّل خصماً على الباقة الجديدة." },
          { type: "numbered", items: [
            "من لوحة التحكم، انتقل لـ \"الاشتراك والفواتير\"",
            "انقر على \"تغيير الباقة\"",
            "اختر الباقة الجديدة",
            "راجع الفرق المالي المحتسب",
            "انقر \"تأكيد الترقية\" وستُفعَّل فوراً"
          ]},
          { type: "heading", text: "الخفض لباقة أدنى" },
          { type: "paragraph", text: "عند الخفض، تستمر الباقة الحالية حتى نهاية فترة الفوترة الحالية. بعدها تنتقل للباقة الجديدة. لن تُخسر أي بيانات، لكن بعض الخصائص ستصبح غير متاحة." },
          { type: "warning", text: "تنبيه: إذا كنت تستخدم خصائص موجودة في الباقة الأعلى فقط (مثل عدد حملات أكثر)، ستحتاج لتعطيل الزائد عند الخفض لتجنب الأخطاء." },
          { type: "heading", text: "احتساب الرصيد المتبقي" },
          { type: "paragraph", text: "عند الترقية منتصف الدورة: يُحتسب ما دفعته لهذه الدورة بشكل يومي. الأيام المتبقية تُخصم من تكلفة الباقة الجديدة. لن تدفع مرتين أبداً." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah allows you to change your plan at any time with flexibility. Whether you want to upgrade to a higher plan or downgrade to a lower one, the process is smooth and hassle-free." },
          { type: "heading", text: "Upgrading to a Higher Plan" },
          { type: "paragraph", text: "Upgrading is instant. Once confirmed, you immediately get all the features of the new plan. The remaining balance from your current plan is converted as a discount on the new plan." },
          { type: "numbered", items: [
            "From the dashboard, go to \"Subscription & Billing\"",
            "Click \"Change Plan\"",
            "Select the new plan",
            "Review the calculated price difference",
            "Click \"Confirm Upgrade\" and it will be activated immediately"
          ]},
          { type: "heading", text: "Downgrading to a Lower Plan" },
          { type: "paragraph", text: "When downgrading, the current plan continues until the end of the current billing period. After that, you switch to the new plan. No data will be lost, but some features will become unavailable." },
          { type: "warning", text: "Note: If you're using features exclusive to the higher plan (such as more campaigns), you'll need to disable the excess when downgrading to avoid errors." },
          { type: "heading", text: "Remaining Balance Calculation" },
          { type: "paragraph", text: "When upgrading mid-cycle: what you've paid for this cycle is calculated on a daily basis. The remaining days are deducted from the new plan's cost. You will never pay twice." },
        ],
      },
      {
        id: "billing-cancel",
        categoryId: "billing",
        title: "سياسة الإلغاء واسترداد المبلغ",
        titleEn: "Cancellation and Refund Policy",
        desc: "شروط الإلغاء وكيفية طلب استرداد وفق الضمان المقدم.",
        descEn: "Cancellation terms and how to request a refund under the provided guarantee.",
        time: "5 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "نؤمن بأن رضاك هو أولويتنا. لذلك نقدم سياسة إلغاء واسترداد واضحة وعادلة بدون شروط معقدة." },
          { type: "heading", text: "ضمان الاسترداد خلال 14 يوماً" },
          { type: "paragraph", text: "إذا اشتركت في أي باقة مدفوعة وقررت الإلغاء خلال 14 يوماً من أول اشتراك، سنرد لك المبلغ كاملاً بدون أسئلة. هذا الضمان لاشتراكات المرة الأولى فقط." },
          { type: "heading", text: "الإلغاء بعد 14 يوماً" },
          { type: "paragraph", text: "يمكنك إلغاء الاشتراك في أي وقت. لن تُفرض رسوم بعد تاريخ الإلغاء. الباقة الحالية تستمر حتى نهاية فترة الفوترة المدفوعة." },
          { type: "numbered", items: [
            "انتقل لـ \"الاشتراك والفواتير\" في لوحة التحكم",
            "انقر على \"إلغاء الاشتراك\"",
            "اختر سبب الإلغاء (اختياري)",
            "أكّد الإلغاء",
            "ستصلك رسالة تأكيد على بريدك الإلكتروني"
          ]},
          { type: "heading", text: "ماذا يحدث بعد الإلغاء؟" },
          { type: "list", items: [
            "تُوقف التوصيات فوراً عند انتهاء الباقة الحالية",
            "بياناتك وإعداداتك تُحفظ لمدة 90 يوماً",
            "يمكنك إعادة تفعيل الاشتراك في أي وقت خلال هذه المدة واسترداد كل شيء",
            "بعد 90 يوماً تُحذف جميع البيانات المتعلقة بمتجرك"
          ]},
          { type: "heading", text: "كيف تطلب استرداداً" },
          { type: "paragraph", text: "لطلب استرداد ضمن الـ 14 يوماً، تواصل معنا عبر واتساب أو البريد الإلكتروني مع ذكر رقم حسابك وسبب الإلغاء. الاسترداد يُنفَّذ خلال 5-10 أيام عمل على نفس وسيلة الدفع المستخدمة." },
          { type: "tip", text: "قبل الإلغاء، تحدث معنا. كثير من المشكلات حلّها بسيط، وربما نجد لك حلاً أفضل من الإلغاء." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "We believe your satisfaction is our priority. That's why we offer a clear and fair cancellation and refund policy without complicated terms." },
          { type: "heading", text: "14-Day Money-Back Guarantee" },
          { type: "paragraph", text: "If you subscribe to any paid plan and decide to cancel within 14 days of your first subscription, we'll refund the full amount with no questions asked. This guarantee is for first-time subscriptions only." },
          { type: "heading", text: "Cancellation After 14 Days" },
          { type: "paragraph", text: "You can cancel your subscription at any time. No charges will be applied after the cancellation date. The current plan continues until the end of the paid billing period." },
          { type: "numbered", items: [
            "Go to \"Subscription & Billing\" in the dashboard",
            "Click \"Cancel Subscription\"",
            "Select a cancellation reason (optional)",
            "Confirm the cancellation",
            "You'll receive a confirmation email"
          ]},
          { type: "heading", text: "What Happens After Cancellation?" },
          { type: "list", items: [
            "Recommendations stop immediately when the current plan expires",
            "Your data and settings are preserved for 90 days",
            "You can reactivate the subscription at any time during this period and recover everything",
            "After 90 days, all data related to your store is deleted"
          ]},
          { type: "heading", text: "How to Request a Refund" },
          { type: "paragraph", text: "To request a refund within the 14-day period, contact us via WhatsApp or email with your account number and cancellation reason. The refund is processed within 5–10 business days to the same payment method used." },
          { type: "tip", text: "Before canceling, talk to us. Many problems have simple solutions, and we might find a better option for you than cancellation." },
        ],
      },
      {
        id: "billing-payment",
        categoryId: "billing",
        title: "طرق الدفع المتاحة وكيف تحدّث بياناتك",
        titleEn: "Available Payment Methods and Updating Your Details",
        desc: "الدفع عبر بطاقات مدى وفيزا وماستر وإدارة بيانات الدفع.",
        descEn: "Payment via Mada, Visa, and Mastercard, and managing payment information.",
        time: "3 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "زيادة يدعم طرق الدفع الشائعة في المنطقة العربية، ويوفر بوابة دفع آمنة ومشفرة." },
          { type: "heading", text: "طرق الدفع المقبولة" },
          { type: "list", items: [
            "بطاقة مدى (مباشر)",
            "فيزا (ائتمانية وسحب)",
            "ماستركارد (ائتمانية وسحب)",
            "أمريكان إكسبريس",
            "Apple Pay (للدفع السريع)"
          ]},
          { type: "heading", text: "أمان بيانات الدفع" },
          { type: "paragraph", text: "لا نحفظ أرقام بطاقاتك لدينا. جميع بيانات الدفع تُخزَّن بشكل آمن عبر مزود الدفع المرخص (مدعوم بتشفير PCI DSS). نحن نحصل فقط على رمز مرجعي للتجديد التلقائي." },
          { type: "heading", text: "تحديث بيانات الدفع" },
          { type: "numbered", items: [
            "انتقل لـ \"الاشتراك والفواتير\"",
            "انقر على \"تعديل طريقة الدفع\"",
            "أدخل بيانات البطاقة الجديدة",
            "انقر \"حفظ\" - ستُستخدم هذه البطاقة في التجديد القادم"
          ]},
          { type: "heading", text: "التجديد التلقائي" },
          { type: "paragraph", text: "الاشتراك يُجدَّد تلقائياً. ستصلك إشعارات قبل 3 أيام من موعد التجديد. يمكنك إيقاف التجديد التلقائي في أي وقت مع الاحتفاظ بالاشتراك حتى نهاية الفترة الحالية." },
          { type: "tip", text: "إذا رُفضت بطاقتك عند التجديد، لديك 7 أيام لتحديث بيانات الدفع قبل إيقاف الخدمة. ستصلك تنبيهات يومية خلال هذه الفترة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah supports popular payment methods in the Arab region and provides a secure, encrypted payment gateway." },
          { type: "heading", text: "Accepted Payment Methods" },
          { type: "list", items: [
            "Mada card (direct)",
            "Visa (credit and debit)",
            "Mastercard (credit and debit)",
            "American Express",
            "Apple Pay (for quick payments)"
          ]},
          { type: "heading", text: "Payment Data Security" },
          { type: "paragraph", text: "We do not store your card numbers. All payment data is securely stored through our licensed payment provider (backed by PCI DSS encryption). We only receive a reference token for automatic renewal." },
          { type: "heading", text: "Updating Payment Information" },
          { type: "numbered", items: [
            "Go to \"Subscription & Billing\"",
            "Click \"Edit Payment Method\"",
            "Enter the new card details",
            "Click \"Save\" — this card will be used for the next renewal"
          ]},
          { type: "heading", text: "Automatic Renewal" },
          { type: "paragraph", text: "The subscription renews automatically. You'll receive notifications 3 days before the renewal date. You can stop automatic renewal at any time while keeping the subscription until the end of the current period." },
          { type: "tip", text: "If your card is declined during renewal, you have 7 days to update your payment information before the service is suspended. You'll receive daily alerts during this period." },
        ],
      },
    ],
  },
  {
    id: "technical",
    label: "التقنية والتكامل",
    labelEn: "Technical & Integration",
    color: "#ec4899",
    icon: "🔧",
    articles: [
      {
        id: "technical-integration",
        categoryId: "technical",
        title: "كيف يتكامل زيادة مع زد وسلة؟",
        titleEn: "How Does Ziadah Integrate with Zid and Salla?",
        desc: "شرح الاتصال التقني بين زيادة والمنصتين وكيف تتم المزامنة.",
        descEn: "Explanation of the technical connection between Ziadah and both platforms and how sync works.",
        time: "6 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "زيادة يتكامل مع منصتي زد وسلة عبر واجهات برمجية (API) رسمية ومعتمدة. هذا التكامل العميق هو ما يجعل التوصيات دقيقة وفورية." },
          { type: "heading", text: "آلية الربط التقني" },
          { type: "paragraph", text: "عند تثبيت زيادة، يحصل على OAuth token - وهو مفتاح وصول آمن يتيح له قراءة بيانات المنتجات والطلبات دون الحاجة لكلمة مرورك. هذا المفتاح مشفر ويمكن إلغاؤه في أي وقت." },
          { type: "heading", text: "المزامنة المستمرة" },
          { type: "list", items: [
            "المنتجات: مزامنة فورية عند إضافة أو تعديل منتج",
            "المخزون: تحديث كل 15 دقيقة",
            "الطلبات: مزامنة فورية عند كل طلب جديد",
            "الفئات: مزامنة عند أي تغيير"
          ]},
          { type: "heading", text: "إدارة الصلاحيات الممنوحة" },
          { type: "paragraph", text: "في أي وقت يمكنك مراجعة الصلاحيات الممنوحة لزيادة من لوحة تحكم زد أو سلة، في قسم التطبيقات. الصلاحيات تقتصر على القراءة فقط - لا يمكن لزيادة تعديل بيانات متجرك." },
          { type: "heading", text: "الأداء والسرعة" },
          { type: "paragraph", text: "نظام التكامل مصمم بـ Edge Computing - خوادمنا موجودة في مناطق قريبة من المملكة لضمان سرعة استجابة أقل من 100 مللي ثانية في معظم الحالات." },
          { type: "tip", text: "إذا لاحظت تأخراً في ظهور تغييرات المنتجات في توصيات زيادة، يمكنك إجراء \"مزامنة يدوية\" من لوحة تحكم زيادة في قسم الإعدادات." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah integrates with both Zid and Salla platforms through official, certified APIs. This deep integration is what makes recommendations accurate and instant." },
          { type: "heading", text: "Technical Connection Mechanism" },
          { type: "paragraph", text: "When you install Ziadah, it receives an OAuth token — a secure access key that allows it to read product and order data without needing your password. This key is encrypted and can be revoked at any time." },
          { type: "heading", text: "Continuous Sync" },
          { type: "list", items: [
            "Products: Instant sync when a product is added or modified",
            "Inventory: Updated every 15 minutes",
            "Orders: Instant sync with every new order",
            "Categories: Synced on any change"
          ]},
          { type: "heading", text: "Managing Granted Permissions" },
          { type: "paragraph", text: "At any time, you can review the permissions granted to Ziadah from your Zid or Salla dashboard, in the Apps section. Permissions are read-only — Ziadah cannot modify your store's data." },
          { type: "heading", text: "Performance and Speed" },
          { type: "paragraph", text: "The integration system is built with Edge Computing — our servers are located in regions close to Saudi Arabia to ensure a response time of less than 100 milliseconds in most cases." },
          { type: "tip", text: "If you notice a delay in product changes appearing in Ziadah's recommendations, you can perform a \"Manual Sync\" from the Ziadah dashboard in the Settings section." },
        ],
      },
      {
        id: "technical-themes",
        categoryId: "technical",
        title: "التعامل مع ثيمات المتاجر المخصصة",
        titleEn: "Working with Custom Store Themes",
        desc: "كيف تضمن ظهور الاقتراحات بشكل صحيح في ثيمات غير القياسية.",
        descEn: "How to ensure recommendations display correctly in non-standard themes.",
        time: "8 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "زيادة مصمم للعمل مع الثيمات القياسية تلقائياً، لكن الثيمات المخصصة أو المعدّلة قد تحتاج بعض الضبط الإضافي لضمان ظهور التوصيات بشكل صحيح." },
          { type: "heading", text: "الثيمات القياسية (تعمل تلقائياً)" },
          { type: "paragraph", text: "معظم ثيمات زد وسلة الرسمية تدعم زيادة بشكل كامل بدون أي تدخل يدوي. يمكنك التحقق من توافق ثيمك في قائمة الثيمات المدعومة في لوحة تحكم زيادة." },
          { type: "heading", text: "الثيمات المخصصة - ما قد تحتاجه" },
          { type: "list", items: [
            "تأكد من وجود حاوية HTML بـ class أو ID محدد لكل نقطة اقتراح",
            "زيادة يحتاج لـ data-attributes معينة لتحديد موضع التوصيات",
            "بعض الثيمات تستخدم JavaScript Frameworks تحتاج تهيئة خاصة"
          ]},
          { type: "heading", text: "إضافة نقطة اقتراح يدوياً في ثيمك" },
          { type: "numbered", items: [
            "من لوحة تحكم زيادة، انتقل لـ \"نقاط الاقتراح\"",
            "اختر النقطة التي تريد تفعيلها (مثل صفحة المنتج)",
            "انسخ كود HTML الذي يوفره زيادة",
            "ألصقه في الموضع الصحيح في ملف قالب ثيمك",
            "احفظ واختبر في المتجر"
          ]},
          { type: "heading", text: "اختبار الظهور الصحيح" },
          { type: "paragraph", text: "بعد التثبيت، افتح أدوات المطور في المتصفح (F12) وابحث عن عناصر بـ class \"ziadah-widget\". إذا وجدتها، فالتكامل ناجح. إذا لم تجدها، هناك مشكلة في التثبيت." },
          { type: "warning", text: "تنبيه: إذا كنت تستخدم ثيم مخصص ولم تره في القائمة المدعومة، تواصل مع فريق الدعم قبل التثبيت. لدينا خبراء يمكنهم مساعدتك في التثبيت." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah is designed to work with standard themes automatically, but custom or modified themes may need some additional adjustments to ensure recommendations appear correctly." },
          { type: "heading", text: "Standard Themes (Work Automatically)" },
          { type: "paragraph", text: "Most official Zid and Salla themes fully support Ziadah without any manual intervention. You can verify your theme's compatibility in the supported themes list in the Ziadah dashboard." },
          { type: "heading", text: "Custom Themes — What You May Need" },
          { type: "list", items: [
            "Ensure an HTML container with a specific class or ID exists for each suggestion point",
            "Ziadah needs specific data-attributes to determine recommendation placement",
            "Some themes use JavaScript Frameworks that require special configuration"
          ]},
          { type: "heading", text: "Manually Adding a Suggestion Point to Your Theme" },
          { type: "numbered", items: [
            "From the Ziadah dashboard, go to \"Suggestion Points\"",
            "Select the point you want to activate (e.g., product page)",
            "Copy the HTML code provided by Ziadah",
            "Paste it in the correct position in your theme template file",
            "Save and test in the store"
          ]},
          { type: "heading", text: "Testing Correct Display" },
          { type: "paragraph", text: "After installation, open browser developer tools (F12) and search for elements with the class \"ziadah-widget\". If you find them, the integration is successful. If not, there's an installation issue." },
          { type: "warning", text: "Note: If you're using a custom theme and don't see it in the supported list, contact the support team before installation. We have experts who can help you with the setup." },
        ],
      },
      {
        id: "technical-analytics",
        categoryId: "technical",
        title: "تكامل زيادة مع Google Analytics",
        titleEn: "Ziadah Integration with Google Analytics",
        desc: "كيف تتبع أداء الاقتراحات في تقارير Analytics.",
        descEn: "How to track recommendation performance in Analytics reports.",
        time: "7 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "ربط زيادة بـ Google Analytics يعطيك صورة أكمل عن تأثير التوصيات على رحلة العميل الكاملة، من النقر على التوصية حتى إتمام الشراء." },
          { type: "heading", text: "ما ترسله زيادة لـ Analytics" },
          { type: "list", items: [
            "زيارة التوصية: عندما يشاهد العميل التوصيات",
            "النقر على التوصية: product_click event مع معرف المنتج",
            "إضافة للسلة من توصية: add_to_cart مع مصدر الإضافة",
            "الشراء المتأثر: إضافة attribution parameter للإيراد"
          ]},
          { type: "heading", text: "إعداد التكامل" },
          { type: "numbered", items: [
            "تأكد من وجود Google Analytics 4 (GA4) على متجرك",
            "من لوحة تحكم زيادة، انتقل لـ \"التكاملات\"",
            "انقر على Google Analytics",
            "أدخل Measurement ID الخاص بحساب GA4 (يبدأ بـ G-)",
            "فعّل أحداث التتبع التي تريدها",
            "انشر وانتظر 24 ساعة لظهور البيانات في GA4"
          ]},
          { type: "heading", text: "قراءة التقارير في GA4" },
          { type: "paragraph", text: "في GA4، انتقل لـ Events وابحث عن الأحداث التي تبدأ بـ \"ziadah_\". يمكنك إنشاء Conversion Event خاص بالمشتريات المتأثرة لقياس عائد الاستثمار بدقة." },
          { type: "heading", text: "إنشاء لوحة تحكم مخصصة في GA4" },
          { type: "list", items: [
            "أنشئ Exploration جديدة في GA4",
            "أضف Dimension: \"Event Name\" وفلتر بـ \"contains ziadah\"",
            "أضف Metric: \"Event Count\" و\"Conversions\"",
            "أضف Metric: \"Revenue\" مع Segment للمشتريات المتأثرة"
          ]},
          { type: "tip", text: "يمكنك أيضاً ربط زيادة بـ Meta Pixel وTikTok Pixel وSnapchat Pixel للتتبع على منصات التواصل الاجتماعي. هذه التكاملات متاحة في نفس قسم \"التكاملات\"." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Linking Ziadah with Google Analytics gives you a more complete picture of how recommendations impact the entire customer journey, from clicking a recommendation to completing a purchase." },
          { type: "heading", text: "What Ziadah Sends to Analytics" },
          { type: "list", items: [
            "Recommendation view: When the customer sees the recommendations",
            "Recommendation click: product_click event with the product ID",
            "Add to cart from recommendation: add_to_cart with the addition source",
            "Influenced purchase: attribution parameter added to revenue"
          ]},
          { type: "heading", text: "Setting Up the Integration" },
          { type: "numbered", items: [
            "Ensure Google Analytics 4 (GA4) is installed on your store",
            "From the Ziadah dashboard, go to \"Integrations\"",
            "Click on Google Analytics",
            "Enter your GA4 Measurement ID (starts with G-)",
            "Enable the tracking events you want",
            "Publish and wait 24 hours for data to appear in GA4"
          ]},
          { type: "heading", text: "Reading Reports in GA4" },
          { type: "paragraph", text: "In GA4, go to Events and search for events starting with \"ziadah_\". You can create a Conversion Event specifically for influenced purchases to accurately measure ROI." },
          { type: "heading", text: "Creating a Custom Dashboard in GA4" },
          { type: "list", items: [
            "Create a new Exploration in GA4",
            "Add Dimension: \"Event Name\" and filter by \"contains ziadah\"",
            "Add Metric: \"Event Count\" and \"Conversions\"",
            "Add Metric: \"Revenue\" with a Segment for influenced purchases"
          ]},
          { type: "tip", text: "You can also link Ziadah with Meta Pixel, TikTok Pixel, and Snapchat Pixel for tracking on social media platforms. These integrations are available in the same \"Integrations\" section." },
        ],
      },
      {
        id: "technical-speed",
        categoryId: "technical",
        title: "سرعة الموقع وتأثير زيادة",
        titleEn: "Website Speed and Ziadah's Impact",
        desc: "كيف صممنا زيادة ليكون خفيفاً ولا يؤثر على سرعة متجرك.",
        descEn: "How we designed Ziadah to be lightweight and not affect your store's speed.",
        time: "4 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "سرعة متجرك تؤثر مباشرة على مبيعاتك - كل ثانية تأخير تعني انخفاضاً في التحويلات. لذلك بنينا زيادة من البداية ليكون أخف ما يمكن." },
          { type: "heading", text: "الأرقام التقنية" },
          { type: "list", items: [
            "حجم السكريبت الرئيسي: أقل من 3 كيلوبايت مضغوطة",
            "التحميل: Async بالكامل - لا يوقف تحميل الصفحة",
            "أول استجابة API: أقل من 100ms لـ 95% من الطلبات",
            "استخدام الذاكرة: أقل من 1MB في ذاكرة المتصفح"
          ]},
          { type: "heading", text: "تقنيات تحسين الأداء" },
          { type: "list", items: [
            "Lazy Loading: التوصيات تُحمَّل فقط عند الحاجة",
            "Edge Caching: ذاكرة تخزين مؤقت قرب المستخدم",
            "Prefetching: يجلب التوصيات بشكل استباقي عند احتمال الحاجة",
            "Image Optimization: صور المنتجات محسّنة تلقائياً"
          ]},
          { type: "heading", text: "اختبار التأثير على سرعتك" },
          { type: "paragraph", text: "يمكنك قياس التأثير الفعلي باستخدام Google PageSpeed Insights مرة قبل تثبيت زيادة ومرة بعده. في الغالب الفرق أقل من 1% في Core Web Vitals." },
          { type: "tip", text: "إذا لاحظت أي تأثير على سرعة متجرك بعد تثبيت زيادة، تواصل مع الدعم الفني فوراً. لدينا أدوات تشخيص متقدمة لمعرفة السبب وحله." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Your store's speed directly impacts your sales — every second of delay means a drop in conversions. That's why we built Ziadah from the ground up to be as lightweight as possible." },
          { type: "heading", text: "Technical Numbers" },
          { type: "list", items: [
            "Main script size: Less than 3 kilobytes compressed",
            "Loading: Fully async — doesn't block page loading",
            "First API response: Under 100ms for 95% of requests",
            "Memory usage: Less than 1MB in browser memory"
          ]},
          { type: "heading", text: "Performance Optimization Techniques" },
          { type: "list", items: [
            "Lazy Loading: Recommendations load only when needed",
            "Edge Caching: Cache stored close to the user",
            "Prefetching: Proactively fetches recommendations when likely needed",
            "Image Optimization: Product images are automatically optimized"
          ]},
          { type: "heading", text: "Testing the Impact on Your Speed" },
          { type: "paragraph", text: "You can measure the actual impact using Google PageSpeed Insights once before installing Ziadah and once after. Typically, the difference is less than 1% in Core Web Vitals." },
          { type: "tip", text: "If you notice any impact on your store's speed after installing Ziadah, contact technical support immediately. We have advanced diagnostic tools to identify and resolve the issue." },
        ],
      },
      {
        id: "technical-team",
        categoryId: "technical",
        title: "إضافة فريق العمل وإدارة الصلاحيات",
        titleEn: "Adding Team Members and Managing Permissions",
        desc: "كيف تضيف أعضاء للفريق وتحدد صلاحيات كل منهم.",
        descEn: "How to add team members and set permissions for each one.",
        time: "5 دقائق",
        timeEn: "3 min",
        sections: [
          { type: "paragraph", text: "زيادة يدعم إدارة الفريق بصلاحيات مرنة. يمكنك إضافة أعضاء فريقك ومنحهم وصولاً محدداً حسب دورهم دون منحهم صلاحيات كاملة." },
          { type: "heading", text: "مستويات الصلاحيات" },
          { type: "list", items: [
            "المالك (Owner): صلاحيات كاملة بما فيها الفواتير والإلغاء",
            "المدير (Admin): كل شيء عدا الفواتير والحذف",
            "المسوّق (Marketer): إنشاء وتعديل الحملات فقط",
            "المحلل (Analyst): قراءة التقارير والتحليلات فقط"
          ]},
          { type: "heading", text: "إضافة عضو جديد" },
          { type: "numbered", items: [
            "من إعدادات الحساب، انتقل لـ \"فريق العمل\"",
            "انقر \"إضافة عضو\"",
            "أدخل البريد الإلكتروني للعضو الجديد",
            "اختر مستوى الصلاحية المناسب",
            "انقر \"إرسال دعوة\"",
            "العضو سيتلقى بريداً للتسجيل وسيظهر في قائمة الفريق"
          ]},
          { type: "heading", text: "إدارة الأعضاء الحاليين" },
          { type: "paragraph", text: "يمكنك في أي وقت تعديل صلاحيات عضو موجود أو إزالته من الفريق. الإزالة فورية ويفقد العضو وصوله للوحة التحكم فور الإزالة." },
          { type: "tip", text: "أفضل ممارسة: منح المسوّقين صلاحية \"Marketer\" فقط. هذا يمنعهم من حذف الحملات القديمة عن طريق الخطأ أو الوصول للبيانات المالية." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah supports team management with flexible permissions. You can add team members and grant them specific access based on their role without giving them full permissions." },
          { type: "heading", text: "Permission Levels" },
          { type: "list", items: [
            "Owner: Full permissions including billing and cancellation",
            "Admin: Everything except billing and deletion",
            "Marketer: Create and edit campaigns only",
            "Analyst: Read reports and analytics only"
          ]},
          { type: "heading", text: "Adding a New Member" },
          { type: "numbered", items: [
            "From account settings, go to \"Team\"",
            "Click \"Add Member\"",
            "Enter the new member's email address",
            "Choose the appropriate permission level",
            "Click \"Send Invitation\"",
            "The member will receive a registration email and will appear in the team list"
          ]},
          { type: "heading", text: "Managing Existing Members" },
          { type: "paragraph", text: "You can modify an existing member's permissions or remove them from the team at any time. Removal is immediate and the member loses access to the dashboard instantly upon removal." },
          { type: "tip", text: "Best practice: Grant marketers \"Marketer\" permission only. This prevents them from accidentally deleting old campaigns or accessing financial data." },
        ],
      },
      {
        id: "technical-troubleshoot",
        categoryId: "technical",
        title: "استكشاف الأخطاء الشائعة وحلها",
        titleEn: "Troubleshooting Common Issues",
        desc: "قائمة بأكثر المشكلات تكراراً وكيف تحلها بنفسك.",
        descEn: "List of the most common problems and how to solve them yourself.",
        time: "10 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "جمعنا لك أكثر 8 مشكلات تقنية يواجهها التجار مع حلول سريعة يمكنك تطبيقها بنفسك في دقائق." },
          { type: "heading", text: "المشكلة 1: التوصيات لا تظهر في المتجر" },
          { type: "list", items: [
            "تأكد من أن الحملة في حالة \"نشط\" وليس \"موقوف\"",
            "تأكد من أن الثيم يدعم زيادة أو أن الكود مُضمَّن يدوياً",
            "امسح ذاكرة التخزين المؤقت (Cache) للمتجر",
            "تحقق من أن المنتجات مزامنة في لوحة تحكم زيادة"
          ]},
          { type: "heading", text: "المشكلة 2: التوصيات تظهر بتصميم خاطئ" },
          { type: "list", items: [
            "تأكد من عدم وجود CSS يتعارض مع اقتراح زيادة",
            "راجع إعدادات التخصيص البصري في الحملة",
            "جرب تعطيل الإضافات الأخرى مؤقتاً للتحقق من التعارض"
          ]},
          { type: "heading", text: "المشكلة 3: المزامنة تتأخر أو تفشل" },
          { type: "list", items: [
            "افتح لوحة تحكم زيادة وانتقل لـ \"حالة المزامنة\"",
            "انقر \"مزامنة يدوية\" وانتظر اكتمالها",
            "إذا استمرت المشكلة، أعد تفويض التطبيق من إعدادات زد/سلة"
          ]},
          { type: "heading", text: "المشكلة 4: عدد الطلبات المتأثرة منخفض جداً" },
          { type: "list", items: [
            "تأكد من أن نقاط الاقتراح صحيحة وظاهرة للعملاء",
            "راجع نسبة CTR - إذا كانت عالية لكن التحويل منخفض، المشكلة في تجربة إضافة للسلة",
            "جرب تغيير طريقة العرض أو الهدف"
          ]},
          { type: "heading", text: "المشكلة 5: لوحة التحليلات تعرض صفراً" },
          { type: "list", items: [
            "تأكد من أن تتبع الأحداث مُفعَّل في الإعدادات",
            "تأكد من أنك تعرض الفترة الزمنية الصحيحة",
            "البيانات تظهر بتأخير 2-4 ساعات كحد أقصى"
          ]},
          { type: "heading", text: "المشكلة 6: الحملة لا تُنشأ" },
          { type: "list", items: [
            "تأكد من ملء جميع الحقول الإلزامية",
            "تأكد من عدم تجاوز الحد الأقصى لعدد الحملات في باقتك",
            "جرب تحديث الصفحة والمحاولة مجدداً"
          ]},
          { type: "heading", text: "المشكلة 7: التوصيات تكرر نفس المنتجات" },
          { type: "list", items: [
            "هذا طبيعي في الأيام الأولى قبل تجمع بيانات كافية",
            "تأكد من صحة الفئات وأوصاف المنتجات",
            "انتظر أسبوعاً لتحسن التنوع في التوصيات"
          ]},
          { type: "heading", text: "المشكلة 8: خطأ 401 أو انتهاء الصلاحية" },
          { type: "list", items: [
            "انتقل لإعدادات التطبيق في زد/سلة",
            "أزل تطبيق زيادة وأعد تثبيته",
            "هذا يجدد التوكن ويحل مشكلة انتهاء الصلاحية"
          ]},
          { type: "tip", text: "إذا لم يحل أي مما سبق مشكلتك، تواصل مع الدعم الفني عبر واتساب مع تصوير الشاشة أو وصف تفصيلي للمشكلة. سنحل معظم المشكلات في غضون ساعة." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "We've compiled the 8 most common technical issues merchants face, along with quick solutions you can apply yourself in minutes." },
          { type: "heading", text: "Issue 1: Recommendations Don't Appear in the Store" },
          { type: "list", items: [
            "Ensure the campaign is set to \"Active\" and not \"Paused\"",
            "Ensure the theme supports Ziadah or that the code has been manually embedded",
            "Clear the store's cache",
            "Verify products are synced in the Ziadah dashboard"
          ]},
          { type: "heading", text: "Issue 2: Recommendations Appear with Wrong Design" },
          { type: "list", items: [
            "Ensure there's no CSS conflicting with Ziadah's widget",
            "Review the visual customization settings in the campaign",
            "Try temporarily disabling other extensions to check for conflicts"
          ]},
          { type: "heading", text: "Issue 3: Sync Is Delayed or Fails" },
          { type: "list", items: [
            "Open the Ziadah dashboard and go to \"Sync Status\"",
            "Click \"Manual Sync\" and wait for it to complete",
            "If the issue persists, re-authorize the app from Zid/Salla settings"
          ]},
          { type: "heading", text: "Issue 4: Number of Influenced Orders Is Very Low" },
          { type: "list", items: [
            "Ensure suggestion points are correct and visible to customers",
            "Review CTR — if it's high but conversion is low, the issue is with the add-to-cart experience",
            "Try changing the display method or goal"
          ]},
          { type: "heading", text: "Issue 5: Analytics Dashboard Shows Zero" },
          { type: "list", items: [
            "Ensure event tracking is enabled in settings",
            "Ensure you're viewing the correct time period",
            "Data appears with a maximum delay of 2–4 hours"
          ]},
          { type: "heading", text: "Issue 6: Campaign Won't Create" },
          { type: "list", items: [
            "Ensure all required fields are filled",
            "Ensure you haven't exceeded the maximum campaign count for your plan",
            "Try refreshing the page and trying again"
          ]},
          { type: "heading", text: "Issue 7: Recommendations Keep Repeating the Same Products" },
          { type: "list", items: [
            "This is normal in the early days before enough data is collected",
            "Ensure categories and product descriptions are accurate",
            "Wait a week for recommendation variety to improve"
          ]},
          { type: "heading", text: "Issue 8: 401 Error or Expired Authorization" },
          { type: "list", items: [
            "Go to the app settings in Zid/Salla",
            "Remove the Ziadah app and reinstall it",
            "This renews the token and resolves the expiration issue"
          ]},
          { type: "tip", text: "If none of the above resolves your issue, contact technical support via WhatsApp with a screenshot or detailed description of the problem. We resolve most issues within an hour." },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    label: "لوحة التحكم",
    labelEn: "Dashboard",
    color: "#06b6d4",
    icon: "🖥️",
    articles: [
      {
        id: "dashboard-overview",
        categoryId: "dashboard",
        title: "نظرة عامة على لوحة التحكم",
        titleEn: "Dashboard Overview",
        desc: "تعرّف على كل قسم في لوحة تحكم زيادة وكيف تتنقل بين الأقسام بسهولة.",
        descEn: "Explore every section of the Ziadah dashboard and navigate between areas with ease.",
        time: "5 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "لوحة التحكم في زيادة هي مركز إدارة كل شيء — من إنشاء الحملات والاقتراحات إلى متابعة الأداء وضبط إعدادات المتجر. مُصمَّمة لتكون بسيطة وسريعة حتى بدون خبرة تقنية." },
          { type: "heading", text: "الصفحة الرئيسية (Home)" },
          { type: "paragraph", text: "عند تسجيل الدخول ستظهر لك الصفحة الرئيسية التي تعرض ملخصاً فورياً لأداء متجرك: إجمالي الإيرادات المُولَّدة من زيادة، عدد الطلبات التي تضمنت توصية، ومعدل التحويل مقارنةً بالأسبوع الماضي." },
          { type: "heading", text: "الأقسام الرئيسية في الشريط الجانبي" },
          { type: "list", items: [
            "الرئيسية — ملخص الأداء العام وأبرز الأرقام",
            "الاقتراحات — إنشاء وإدارة جميع الاقتراحات (حملات الاقتراح)",
            "التحليلات — تقارير تفصيلية بالإيرادات والنقرات والتحويلات",
            "الإعدادات — إعدادات المتجر، العملة، اللغة، الفريق",
            "الدعم — الوصول السريع لمركز المساعدة وواتساب",
          ]},
          { type: "heading", text: "شريط الأداء العلوي" },
          { type: "paragraph", text: "في أعلى الداشبورد ستجد شريطاً يعرض دائماً: الإيرادات الإضافية اليوم، الطلبات التي تضمنت اقتراح، ونسبة الإيرادات الإضافية من إجمالي المبيعات. هذا الشريط يُحدَّث في الوقت الفعلي." },
          { type: "heading", text: "اختيار المتجر والمنصة" },
          { type: "paragraph", text: "إذا كنت تدير أكثر من متجر (على زد أو سلة)، يمكنك التبديل بينها من القائمة المنسدلة في أعلى يمين الشاشة. كل متجر له بياناته وإعداداته المستقلة." },
          { type: "tip", text: "نصيحة: اضغط على أيقونة الجرس في الشريط العلوي لتفعيل إشعارات الأداء — ستصلك تنبيهات عند وصول اقتراح معين لحد معين من المبيعات." },
        ],
      },
      {
        id: "dashboard-widgets",
        categoryId: "dashboard",
        title: "إنشاء وإدارة الاقتراحات",
        titleEn: "Creating & Managing Widgets",
        desc: "كيف تُنشئ اقتراحاً جديداً، وتُخصصه، وتُنشره في متجرك خطوة بخطوة.",
        descEn: "How to create a new widget, customize it, and publish it to your store step by step.",
        time: "7 دقائق",
        timeEn: "7 min",
        sections: [
          { type: "paragraph", text: "الاقتراحات هي قلب تطبيق زيادة. كل اقتراح هو عنصر ذكي يظهر في متجرك في اللحظة المناسبة ليقترح على العميل منتجات أو عروضاً تزيد من قيمة طلبه." },
          { type: "heading", text: "أنواع الاقتراحات المتاحة" },
          { type: "list", items: [
            "اشترِ أكثر وادّخر أكثر (Buy More Save More) — خصومات تدريجية بحسب الكمية",
            "اشترِ معاً (Buy Together) — اقترح منتجات تُكمل بعضها بسعر مجمّع",
            "الإضافات (Add-ons) — إضافات اختيارية صغيرة بجانب المنتج الرئيسي",
            "المنتجات المرتبطة (Related Products) — منتجات مشابهة لما يشاهده العميل",
            "العروض المجمّعة (Bundle Deals) — حزمة منتجات بسعر خاص",
            "البيع المتقاطع (Cross-Sell) — اقتراح في صفحة السلة لمنتجات تكميلية",
            "قسيمة الخصم (Coupon Widget) — كوبون ذكي يُفعَّل بشرط في السلة",
          ]},
          { type: "heading", text: "خطوات إنشاء اقتراح جديد" },
          { type: "numbered", items: [
            "من الشريط الجانبي، اضغط على \"الاقتراحات\" ثم \"+ اقتراح جديد\"",
            "اختر نوع الاقتراح الذي تريده",
            "اختر صفحة الظهور: صفحة المنتج، صفحة الفئة، صفحة السلة، أو الصفحة الرئيسية",
            "حدد المنتجات أو الفئات التي سيعمل عليها الاقتراح",
            "خصّص النص والألوان والعرض (أفقي أو عمودي أو كارد)",
            "اضغط \"معاينة\" للتحقق من الشكل، ثم \"نشر\" لتفعيله في متجرك",
          ]},
          { type: "heading", text: "حالات الاقتراح" },
          { type: "list", items: [
            "نشط (Active) — الاقتراح يعمل ويظهر للعملاء",
            "موقوف (Paused) — الاقتراح محفوظ لكنه مخفي مؤقتاً",
            "مسودة (Draft) — لم يتم نشره بعد",
          ]},
          { type: "tip", text: "يمكنك تشغيل عدة اقتراحات في نفس الصفحة. لكن احرص على عدم الإفراط — أفضل نتائج تأتي من 1-2 اقتراح فقط في كل صفحة." },
        ],
      },
      {
        id: "dashboard-buy-more-save-more",
        categoryId: "dashboard",
        title: "اقتراح \"اشترِ أكثر وادّخر أكثر\"",
        titleEn: "Buy More Save More Widget",
        desc: "كيف تُعدّ خصومات تدريجية بحسب الكمية لرفع متوسط قيمة الطلب.",
        descEn: "How to set up tiered quantity discounts to increase average order value.",
        time: "6 دقائق",
        timeEn: "6 min",
        sections: [
          { type: "paragraph", text: "اقتراح \"اشترِ أكثر وادّخر أكثر\" يعرض للعميل جدولاً واضحاً: اشترِ 2 واحصل على خصم 10%، اشترِ 3 خصم 15%، اشترِ 5 خصم 25%. هذا النمط يزيد متوسط الكمية في الطلب بنسبة 30-45%." },
          { type: "heading", text: "إعداد مستويات الخصم" },
          { type: "numbered", items: [
            "اختر اقتراح \"اشترِ أكثر وادّخر أكثر\" من قائمة الاقتراحات",
            "اضغط \"+ إضافة مستوى\" لإضافة شريحة جديدة",
            "لكل شريحة حدد: الحد الأدنى للكمية والخصم (نسبة مئوية أو قيمة ثابتة)",
            "يمكنك إضافة حتى 5 مستويات في باقة النمو وما فوق",
            "خصّص عنوان الاقتراح ورسالة التشجيع (مثل: \"وفّر أكثر مع كمية أكبر!\")",
            "اختر الصفحة: صفحة المنتج أو صفحة الفئة",
            "اضغط \"نشر\"",
          ]},
          { type: "heading", text: "الإعدادات المتقدمة" },
          { type: "list", items: [
            "تطبيق على منتجات بعينها أو فئة كاملة أو جميع المتجر",
            "تحديد تاريخ انتهاء للعرض (مفيد للمواسم)",
            "إخفاء الخصم من على بطاقة المنتج وإظهاره فقط في الاقتراح",
            "تفعيل عداد \"المخزون المتبقي\" لخلق الإلحاح",
          ]},
          { type: "tip", text: "الخصومات التدريجية تعمل بشكل ممتاز مع المنتجات الاستهلاكية (عطور، مستلزمات العناية، طعام). ابدأ بثلاثة مستويات فقط — أكثر من ذلك قد يُرهق العميل." },
        ],
      },
      {
        id: "dashboard-buy-together",
        categoryId: "dashboard",
        title: "اقتراح \"اشترِ معاً\"",
        titleEn: "Buy Together Widget",
        desc: "اقترح منتجات تكميلية معاً بسعر مجمّع جذّاب وارفع متوسط قيمة السلة.",
        descEn: "Suggest complementary products together at a bundled price and increase average cart value.",
        time: "5 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "اقتراح \"اشترِ معاً\" يعرض للعميل منتجين أو ثلاثة معاً في مكان واحد مع زر \"أضف الكل للسلة\". الذكاء الاصطناعي يختار التركيبة المثلى بحسب ما يشتريه العملاء معاً فعلياً." },
          { type: "heading", text: "كيفية الإعداد" },
          { type: "numbered", items: [
            "اختر اقتراح \"اشترِ معاً\"",
            "اختر وضع الاقتراح: تلقائي (AI) أو يدوي",
            "في الوضع التلقائي: الذكاء الاصطناعي سيختار التوليفة المثلى بنفسه",
            "في الوضع اليدوي: اختر المنتجات التي تريد ربطها معاً (من 2 إلى 4 منتجات)",
            "حدد ما إذا كنت تريد تقديم خصم على المجموعة وبأي نسبة",
            "خصّص عنوان البلوك (مثل: \"يُشتَرى معاً في أغلب الأحيان\")",
            "اختر مكان الظهور: صفحة المنتج",
          ]},
          { type: "heading", text: "نصائح لأفضل النتائج" },
          { type: "list", items: [
            "اختر منتجات تتكامل وظيفياً (حذاء + جوارب، جهاز + شاحن، عطر + بودي لوشن)",
            "الخصم المقترح بين 5% و15% يولّد أعلى نسبة تحويل",
            "تجنب جمع منتجات بفارق سعري كبير جداً (مثل منتج بـ 10 ﷼ مع منتج بـ 500 ﷼)",
            "استخدم صور عالية الجودة — الاقتراح يعرض الصور بشكل بارز",
          ]},
          { type: "tip", text: "بعد أسبوع من تشغيل الاقتراح بالوضع التلقائي، راجع التحليلات لترى أي تركيبة حققت أعلى نسبة تحويل — يمكنك بعدها تثبيتها يدوياً للمنتجات الأكثر مبيعاً." },
        ],
      },
      {
        id: "dashboard-addons",
        categoryId: "dashboard",
        title: "اقتراح \"الإضافات\" (Add-ons)",
        titleEn: "Add-ons Widget",
        desc: "أضف خيارات تكميلية صغيرة بجانب المنتج الرئيسي ليختار منها العميل بنقرة واحدة.",
        descEn: "Add small optional extras beside the main product for customers to select with one click.",
        time: "5 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "اقتراح الإضافات يعرض قائمة صغيرة من الاختيارات الإضافية (Checkboxes) بجانب زر \"أضف للسلة\". الفكرة مأخوذة من ماكدونالدز: \"هل تريد إضافة البطاطس؟\" — البساطة تجعل العميل يقبل بلا تفكير طويل." },
          { type: "heading", text: "أمثلة عملية للإضافات" },
          { type: "list", items: [
            "متجر الأجهزة: اشتراك ضمان إضافي، حقيبة الجهاز، شاحن احتياطي",
            "متجر الأزياء: تطريز الاسم على الملابس، تغليف هدايا فاخر",
            "متجر العطور: بودي سبلاش مكمّل، بكج الهدية الفاخر",
            "متجر الإلكترونيات: تركيب الجهاز في المنزل، جراب واقٍ، فيلم حماية",
          ]},
          { type: "heading", text: "خطوات الإعداد" },
          { type: "numbered", items: [
            "اختر اقتراح \"الإضافات\" وحدد المنتج أو الفئة التي ستطبقه عليها",
            "اضغط \"+ إضافة خيار\" واكتب اسم الإضافة وسعرها",
            "اختر نوع الإضافة: سعر ثابت أو نسبة مئوية من سعر المنتج",
            "رتّب الإضافات بالسحب والإفلات (الأكثر طلباً في الأعلى)",
            "حدد هل يمكن للعميل اختيار أكثر من إضافة واحدة",
            "اضغط \"نشر\"",
          ]},
          { type: "tip", text: "لا تضع أكثر من 4-5 إضافات في اقتراح واحد. كلما قل عدد الخيارات، ارتفعت نسبة الاختيار. الإضافات الأقل من 15% من سعر المنتج الأصلي تُضاف بنسبة أعلى بكثير." },
        ],
      },
      {
        id: "dashboard-related-products",
        categoryId: "dashboard",
        title: "اقتراح \"المنتجات المرتبطة\"",
        titleEn: "Related Products Widget",
        desc: "عرض منتجات مشابهة أو من نفس الفئة لتوجيه العميل نحو المزيد من الاكتشاف.",
        descEn: "Display similar or same-category products to guide customers toward more discovery.",
        time: "4 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "اقتراح المنتجات المرتبطة يظهر في أسفل صفحة المنتج أو في الشريط الجانبي، ويعرض منتجات مشابهة بحسب الفئة، الوسوم، أو ما يشاهده عملاء آخرون بعد نفس المنتج." },
          { type: "heading", text: "أوضاع الاقتراح" },
          { type: "list", items: [
            "تلقائي بالذكاء الاصطناعي: يحلل سلوك التصفح ويختار المنتجات الأنسب لكل عميل",
            "بحسب الفئة: يعرض منتجات من نفس الفئة/التصنيف",
            "بحسب الوسوم: منتجات تشترك في وسوم معينة",
            "يدوي: أنت تحدد المنتجات التي تريد ربطها",
          ]},
          { type: "heading", text: "خيارات العرض" },
          { type: "list", items: [
            "شريط أفقي قابل للتمرير (Horizontal Scroll) — الأنسب لأسفل صفحة المنتج",
            "شبكة (Grid) — الأنسب للصفحة الرئيسية أو صفحة الفئة",
            "عدد المنتجات المعروضة: من 3 إلى 12",
          ]},
          { type: "heading", text: "الإعدادات المتقدمة" },
          { type: "list", items: [
            "إخفاء المنتجات المنتهية (Out of Stock) تلقائياً",
            "إظهار شارة \"الأكثر مبيعاً\" على المنتجات المميزة",
            "تصفية بحسب نطاق سعري (مثال: لا تعرض منتجات أغلى بأكثر من 2x سعر المنتج الحالي)",
          ]},
          { type: "tip", text: "الوضع التلقائي بالذكاء الاصطناعي يحقق نتائج أفضل بعد جمع بيانات كافية (عادةً 200+ زيارة). في البداية استخدم \"بحسب الفئة\" ثم انتقل للوضع التلقائي لاحقاً." },
        ],
      },
      {
        id: "dashboard-bundle-deals",
        categoryId: "dashboard",
        title: "اقتراح \"العروض المجمّعة\" (Bundle Deals)",
        titleEn: "Bundle Deals Widget",
        desc: "أنشئ حزمة منتجات بسعر خاص وعرضها كوحدة واحدة جاهزة للشراء.",
        descEn: "Create a product bundle at a special price and present it as one ready-to-buy unit.",
        time: "6 دقائق",
        timeEn: "6 min",
        sections: [
          { type: "paragraph", text: "العروض المجمّعة تختلف عن \"اشترِ معاً\" في أنها حزمة واحدة محددة مسبقاً بسعر مجمّع ثابت، يعرضها الذكاء الاصطناعي كبطاقة مستقلة واضحة بدلاً من قائمة اقتراحات." },
          { type: "heading", text: "متى تستخدم Bundle Deals؟" },
          { type: "list", items: [
            "عندما تريد تصفية مخزون معين بسرعة",
            "للمواسم والأعياد (حزمة عيد الأم، حزمة رمضان)",
            "عند تقديم منتج جديد مع منتج رائج",
            "لرفع متوسط قيمة الطلب في فئة معينة",
          ]},
          { type: "heading", text: "كيفية إنشاء Bundle" },
          { type: "numbered", items: [
            "اضغط على \"العروض المجمّعة\" ثم \"+ حزمة جديدة\"",
            "أدخل اسم الحزمة (مثل: \"حزمة المسافر الكاملة\")",
            "أضف المنتجات من 2 إلى 6 منتجات",
            "حدد سعر الحزمة الكلي (سيحسب النظام نسبة التوفير تلقائياً)",
            "اختر صورة الغلاف للحزمة أو اترك النظام يجمع صور المنتجات",
            "حدد مكان الظهور والمنتجات التي ستشغّل عرض الحزمة",
            "اضغط \"نشر\"",
          ]},
          { type: "tip", text: "اعرض نسبة التوفير بوضوح — \"وفّر 45 ﷼\" أو \"خصم 20%\" — هذا يرفع التحويل بشكل ملحوظ. الحزم التي توفّر أكثر من 15% تُضاف للسلة بمعدل ضعف الحزم الأصغر خصماً." },
        ],
      },
      {
        id: "dashboard-cross-sell",
        categoryId: "dashboard",
        title: "اقتراح \"البيع المتقاطع\" (Cross-Sell)",
        titleEn: "Cross-Sell Widget",
        desc: "اقتراح منتجات تكميلية في صفحة السلة لزيادة قيمة الطلب قبل إتمام الشراء.",
        descEn: "Suggest complementary products on the cart page to increase order value before checkout.",
        time: "5 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "اقتراح البيع المتقاطع يظهر في صفحة السلة أو صفحة الدفع، ويقترح منتجات تكمّل ما في السلة. هذه اللحظة من أفضل اللحظات للاقتراح لأن العميل في وضع الشراء الفعلي." },
          { type: "heading", text: "الفرق بين Cross-Sell والاقتراحات الأخرى" },
          { type: "list", items: [
            "Buy Together: يظهر في صفحة المنتج قبل إضافته للسلة",
            "Cross-Sell: يظهر في السلة أو الدفع — بعد اتخاذ قرار الشراء",
            "Cross-Sell أكثر فعالية بسبب التوقيت: العميل منخرط بالفعل في عملية الشراء",
          ]},
          { type: "heading", text: "إعداد الاقتراح" },
          { type: "numbered", items: [
            "اختر اقتراح \"البيع المتقاطع\"",
            "حدد موقع الظهور: صفحة السلة أو صفحة الدفع أو كلاهما",
            "اختر وضع الاقتراح: تلقائي (الذكاء الاصطناعي) أو قواعد يدوية",
            "في القواعد اليدوية: حدد \"إذا كان في السلة منتج X، اقترح Y\"",
            "اضبط حد السعر الأقصى للمنتجات المقترحة (لا تقترح ما هو أغلى من السلة)",
            "اضغط \"نشر\"",
          ]},
          { type: "tip", text: "المنتجات المقترحة في Cross-Sell يجب أن تكون أرخص من متوسط ما في السلة. اقتراح منتج بـ 20 ﷼ لعميل لديه سلة بـ 200 ﷼ يُضاف بنسبة 40% أعلى من اقتراح منتج بـ 150 ﷼." },
        ],
      },
      {
        id: "dashboard-coupon",
        categoryId: "dashboard",
        title: "اقتراح \"قسيمة الخصم\" الذكية",
        titleEn: "Smart Coupon Widget",
        desc: "أنشئ كوبون خصم يُفعَّل تلقائياً بشرط في السلة لتحفيز العميل على إتمام الشراء.",
        descEn: "Create a discount coupon that activates automatically on a cart condition to encourage checkout.",
        time: "5 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "اقتراح القسيمة الذكية يعرض رسالة تشجيعية مع بار تقدم (Progress Bar) يُظهر للعميل كم تبقى ليصل لحد الخصم. مثال: \"أضف 30 ﷼ للسلة واحصل على خصم 15%!\"" },
          { type: "heading", text: "أنواع القسائم المتاحة" },
          { type: "list", items: [
            "خصم بقيمة ثابتة: \"احصل على خصم 20 ﷼ عند إتمام طلب بـ 150 ﷼\"",
            "خصم نسبة مئوية: \"احصل على خصم 15% عند إتمام طلب بـ 200 ﷼\"",
            "شحن مجاني: \"أضف 50 ﷼ للسلة واحصل على شحن مجاني\"",
            "هدية مجانية: عند شراء بمبلغ معين يُضاف منتج مجاناً",
          ]},
          { type: "heading", text: "إعداد اقتراح القسيمة" },
          { type: "numbered", items: [
            "اختر اقتراح \"قسيمة الخصم\"",
            "حدد نوع الحافز (خصم / شحن مجاني / هدية)",
            "أدخل الحد الأدنى للسلة لتفعيل الخصم",
            "أدخل قيمة الخصم أو اختر المنتج الهدية",
            "خصّص رسالة التحفيز (مثل: \"أنت على بُعد خطوة من خصمك!\")",
            "فعّل شريط التقدم (Progress Bar) لعرض المسافة المتبقية",
            "حدد مكان الظهور: أعلى السلة أو بار علوي ثابت في كل الصفحات",
          ]},
          { type: "tip", text: "الشريط التقدمي يرفع نسبة الإضافة للسلة بنسبة 25-35%. لأن الانسان طبيعياً يريد إكمال ما بدأ — نفس مبدأ جمع النقاط في برامج الولاء." },
        ],
      },
      {
        id: "dashboard-analytics",
        categoryId: "dashboard",
        title: "التحليلات والتقارير",
        titleEn: "Analytics & Reports",
        desc: "كيف تقرأ لوحة التحليلات وتستخرج قرارات ذكية لتحسين أداء متجرك.",
        descEn: "How to read the analytics dashboard and extract smart decisions to improve your store performance.",
        time: "7 دقائق",
        timeEn: "7 min",
        sections: [
          { type: "paragraph", text: "قسم التحليلات في زيادة يمنحك رؤية كاملة على تأثير كل اقتراح في متجرك — من النقرات والمشاهدات وصولاً للإيرادات الفعلية التي جاءت من كل اقتراح." },
          { type: "heading", text: "المؤشرات الرئيسية (KPIs)" },
          { type: "list", items: [
            "الإيرادات الإضافية (Extra Revenue): إجمالي ما أضافته زيادة فوق المبيعات العادية",
            "نسبة التحويل (Conversion Rate): من رأى الاقتراح وأضاف للسلة ÷ إجمالي مشاهدات الاقتراح",
            "معدل النقر (CTR): نسبة من ضغط على اقتراح من إجمالي من رآه",
            "متوسط قيمة الطلب (AOV): متوسط قيمة الطلبات التي تضمنت اقتراح من زيادة",
            "عائد الاستثمار (ROI): نسبة الإيرادات الإضافية مقارنةً بتكلفة الاشتراك",
          ]},
          { type: "heading", text: "تقرير أداء الاقتراحات" },
          { type: "paragraph", text: "في لوحة التحليلات، يمكنك مقارنة أداء كل اقتراح بشكل منفصل. الجدول يعرض: اسم الاقتراح، عدد المشاهدات، عدد النقرات، عدد الإضافات للسلة، وإجمالي الإيرادات المُولَّدة." },
          { type: "heading", text: "تصفية التقارير" },
          { type: "list", items: [
            "بالفترة الزمنية: آخر 7 أيام، 30 يوماً، 90 يوماً، أو نطاق مخصص",
            "بالمنتج أو الفئة: أداء الاقتراحات على منتج بعينه",
            "بنوع الاقتراح: مقارنة Bundle Deals مقابل Cross-Sell مثلاً",
            "بالجهاز: جوال مقابل حاسوب",
          ]},
          { type: "heading", text: "تصدير التقارير" },
          { type: "paragraph", text: "يمكنك تصدير أي تقرير بصيغة Excel أو PDF من خلال زر \"تصدير\" في أعلى يمين الجدول. يمكنك أيضاً جدولة إرسال التقرير تلقائياً لبريدك الإلكتروني أسبوعياً أو شهرياً." },
          { type: "tip", text: "ركّز على مؤشر \"الإيرادات الإضافية لكل 1000 ظهور\" لتعرف أي الاقتراحات الأكثر كفاءة. الاقتراح الذي يولّد إيرادات أعلى مع نفس عدد المشاهدات هو الأجدر بالتوسيع." },
        ],
      },
      {
        id: "dashboard-settings",
        categoryId: "dashboard",
        title: "الإعدادات العامة للوحة التحكم",
        titleEn: "General Dashboard Settings",
        desc: "إدارة إعدادات متجرك، اللغة، العملة، الفريق، والإشعارات من مكان واحد.",
        descEn: "Manage your store settings, language, currency, team members, and notifications from one place.",
        time: "5 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "قسم الإعدادات يمكّنك من تخصيص كيفية عمل زيادة مع متجرك وتحكم كامل في الصلاحيات والتفضيلات." },
          { type: "heading", text: "إعدادات المتجر" },
          { type: "list", items: [
            "اسم المتجر وشعاره (يظهر في بعض تقارير PDF)",
            "العملة الافتراضية للعرض في التقارير",
            "المنطقة الزمنية (مهم لدقة تقارير الأداء اليومية)",
            "لغة الواجهة: العربية أو الإنجليزية",
          ]},
          { type: "heading", text: "إدارة الفريق" },
          { type: "paragraph", text: "يمكنك دعوة أعضاء الفريق (مديرو المتجر، المسوّقون) للوصول للوحة التحكم بصلاحيات محددة:" },
          { type: "list", items: [
            "مدير كامل (Admin): صلاحية كاملة على كل شيء بما فيه الفوترة",
            "محرر (Editor): يمكنه إنشاء وتعديل الاقتراحات لكن لا يرى الفواتير",
            "مشاهد (Viewer): يرى التقارير فقط دون تعديل",
          ]},
          { type: "heading", text: "إعدادات الإشعارات" },
          { type: "list", items: [
            "إشعارات البريد الإلكتروني: تقرير أسبوعي، تنبيهات الأداء",
            "تنبيهات واتساب: عند تحقيق هدف إيرادات معين",
            "إشعار انتهاء الاشتراك: قبل 7 أيام و3 أيام من الانتهاء",
          ]},
          { type: "heading", text: "ربط المتجر وإلغاء الربط" },
          { type: "paragraph", text: "من قسم الإعدادات > التكاملات يمكنك مراجعة حالة الربط مع منصة زد أو سلة، وتحديث صلاحيات الوصول، أو إلغاء الربط إذا أردت نقل التطبيق." },
          { type: "warning", text: "تحذير: إلغاء ربط المتجر سيوقف جميع الاقتراحات فوراً. إذا كنت تريد فقط إيقاف مؤقت، استخدم وضع \"إيقاف مؤقت\" من لوحة الاقتراحات بدلاً من إلغاء الربط." },
        ],
      },
      {
        id: "dashboard-targeting",
        categoryId: "dashboard",
        title: "استهداف العملاء والتخصيص",
        titleEn: "Customer Targeting & Personalization",
        desc: "كيف يستهدف الذكاء الاصطناعي كل عميل بشكل مختلف وكيف تضبط قواعد الاستهداف.",
        descEn: "How AI targets each customer differently and how to configure targeting rules.",
        time: "8 دقائق",
        timeEn: "8 min",
        sections: [
          { type: "paragraph", text: "التخصيص هو الميزة الأقوى في زيادة. بدلاً من عرض نفس الاقتراح لكل العملاء، يحلل الذكاء الاصطناعي كل زائر بشكل منفصل ويعرض ما يناسبه تحديداً." },
          { type: "heading", text: "الإشارات التي يحللها الذكاء الاصطناعي" },
          { type: "list", items: [
            "المنتجات التي شاهدها في هذه الزيارة وزيارات سابقة",
            "المنتجات التي أضافها للسلة أو اشتراها من قبل",
            "الجهاز (جوال / حاسوب) والموقع الجغرافي",
            "الوقت من اليوم والموسم",
            "سلوك عملاء مشابهين (Collaborative Filtering)",
          ]},
          { type: "heading", text: "قواعد الاستهداف اليدوية" },
          { type: "paragraph", text: "يمكنك إضافة قواعد يدوية تتحكم فيمن يرى الاقتراح:" },
          { type: "list", items: [
            "أظهر الاقتراح فقط لعملاء من منطقة معينة",
            "أخفِ الاقتراح عن العملاء الذين اشتروا المنتج من قبل",
            "أظهر الاقتراح فقط إذا كانت السلة أكبر من مبلغ معين",
            "أظهر الاقتراح فقط للزوار الجدد (أول زيارة)",
            "أخفِ الاقتراح على الجوال / الحاسوب",
          ]},
          { type: "heading", text: "اختبار A/B" },
          { type: "paragraph", text: "من إعدادات الاقتراح يمكنك تفعيل اختبار A/B: نصف العملاء يرون الإصدار A والنصف الآخر يرون الإصدار B. بعد أسبوعين يُعلن النظام الفائز تلقائياً ويطبقه على الجميع." },
          { type: "tip", text: "ابدأ باختبار A/B على عنصر واحد فقط في كل مرة: العنوان، أو موضع الاقتراح، أو نسبة الخصم. اختبار أكثر من متغير في وقت واحد يصعّب معرفة سبب التغيير في الأداء." },
        ],
      },
    ],
  },
  {
    id: "strategies",
    label: "استراتيجيات النمو",
    labelEn: "Growth Strategies",
    color: "#7c3aed",
    icon: "📈",
    articles: [
      {
        id: "strategies-fashion",
        categoryId: "strategies",
        title: "أفضل الاستراتيجيات لمتاجر الأزياء",
        titleEn: "Best Strategies for Fashion Stores",
        desc: "حزم الإطقم وتجميع الإكسسوارات والخصومات التدريجية - دليل الموضة.",
        descEn: "Set bundles, accessory grouping, and tiered discounts — a fashion guide.",
        time: "10 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "متاجر الأزياء لديها فرصة ذهبية مع زيادة لأن المنتجات مترابطة طبيعياً - الإطقم الكاملة، الإكسسوارات المكملة، والأحجام المختلفة كلها فرص للبيع الإضافي." },
          { type: "heading", text: "استراتيجية 1: حزمة الإطقم الكاملة (Complete the Look)" },
          { type: "paragraph", text: "أقوى استراتيجية لمتاجر الأزياء. عندما يشاهد العميل قطعة ملابس، اقترح له الطقم الكامل. الزيادة في قيمة السلة تكون عادةً 40-70%." },
          { type: "numbered", items: [
            "صنّف منتجاتك بشكل صحيح: قميص، بنطال، حذاء، حقيبة",
            "استخدم وسوم مشتركة للأشياء المتناسقة (مثل \"كلاسيك بيج\")",
            "أنشئ حملة بهدف \"زيادة قيمة السلة\" على صفحة المنتج",
            "اختر طريقة عرض \"Combo\" مع صورة للطقم الكامل"
          ]},
          { type: "heading", text: "استراتيجية 2: تجميع الإكسسوارات" },
          { type: "paragraph", text: "الإكسسوارات (حزام، ساعة، نظارات) تُضاف بسعر منخفض نسبياً لكن تحقق ارتفاعاً كبيراً في قيمة السلة." },
          { type: "list", items: [
            "استخدم Add-ons على صفحة المنتج لعرض إكسسوارات بسعر منخفض",
            "سعر الإضافة يجب أن لا يتجاوز 25% من سعر المنتج الرئيسي",
            "استخدم صور واضحة للإكسسوار مع المنتج الرئيسي"
          ]},
          { type: "heading", text: "استراتيجية 3: الأحجام والألوان البديلة" },
          { type: "paragraph", text: "إذا كان الحجم المطلوب غير متوفر، اقترح بديلاً متاحاً من نفس التصميم بلون مختلف أو حجم قريب. هذا يقلل من ترك المتجر دون شراء." },
          { type: "heading", text: "مؤشرات الأداء لمتاجر الأزياء" },
          { type: "list", items: [
            "متوسط قيمة السلة: هدف رفعه 30-50% خلال 3 أشهر",
            "نسبة شراء إكسسوار مع قطعة رئيسية: هدف 20-30%",
            "نسبة الاطلاع على منتجات مقترحة: هدف 40% فأكثر"
          ]},
          { type: "tip", text: "في موسم الأزياء (رمضان وسبتمبر مع العودة للمدارس والأعياد)، فعّل حملات خاصة للأطقم الكاملة بخصومات محدودة لمدة 72 ساعة فقط." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Fashion stores have a golden opportunity with Ziadah because products are naturally interconnected — complete outfits, complementary accessories, and different sizes are all opportunities for additional sales." },
          { type: "heading", text: "Strategy 1: Complete the Look Bundle" },
          { type: "paragraph", text: "The strongest strategy for fashion stores. When a customer views a clothing item, suggest the complete outfit. The increase in cart value is typically 40–70%." },
          { type: "numbered", items: [
            "Classify your products correctly: shirt, pants, shoes, bag",
            "Use shared tags for coordinating items (e.g., \"classic beige\")",
            "Create a campaign with the \"Increase Cart Value\" goal on the product page",
            "Choose the \"Combo\" display method with an image of the complete outfit"
          ]},
          { type: "heading", text: "Strategy 2: Accessory Grouping" },
          { type: "paragraph", text: "Accessories (belt, watch, glasses) are added at a relatively low price but achieve a significant increase in cart value." },
          { type: "list", items: [
            "Use Add-ons on the product page to display low-priced accessories",
            "The add-on price should not exceed 25% of the main product price",
            "Use clear images of the accessory with the main product"
          ]},
          { type: "heading", text: "Strategy 3: Alternative Sizes and Colors" },
          { type: "paragraph", text: "If the desired size is unavailable, suggest an available alternative of the same design in a different color or a similar size. This reduces store abandonment without a purchase." },
          { type: "heading", text: "Performance Indicators for Fashion Stores" },
          { type: "list", items: [
            "Average cart value: Goal to increase by 30–50% within 3 months",
            "Accessory purchase rate with a main item: Goal of 20–30%",
            "Suggested product viewing rate: Goal of 40% or higher"
          ]},
          { type: "tip", text: "During fashion season (Ramadan, September back-to-school, and holidays), activate special complete outfit campaigns with limited discounts for 72 hours only." },
        ],
      },
      {
        id: "strategies-food",
        categoryId: "strategies",
        title: "زيادة مبيعات متاجر الغذاء والمشروبات",
        titleEn: "Boosting Sales for Food & Beverage Stores",
        desc: "استراتيجيات Combo والاشتراكات الدورية لمتاجر المأكولات والمشروبات.",
        descEn: "Combo strategies and subscription models for food and beverage stores.",
        time: "9 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "متاجر الغذاء والمشروبات لديها معدل شراء تكراري طبيعي عالٍ - التحدي هو رفع قيمة كل طلب وتحويل العملاء من مشترين عشوائيين لمشتركين منتظمين." },
          { type: "heading", text: "استراتيجية 1: وجبات وحزم Combo" },
          { type: "paragraph", text: "جمع منتجات متكاملة (مشروب + وجبة + حلوى) في حزمة بسعر أفضل من الشراء الفردي. هذا يرفع قيمة الطلب ويوفر الوقت على العميل." },
          { type: "list", items: [
            "ادرس أكثر التركيبات التي يشتريها العملاء معاً بالفعل",
            "أنشئ حزمة رسمية بسعر أقل بـ 10-15% من الشراء الفردي",
            "اعرضها على صفحة المنتج وصفحة السلة"
          ]},
          { type: "heading", text: "استراتيجية 2: الكميات الأكبر بسعر أفضل" },
          { type: "paragraph", text: "للمنتجات الاستهلاكية المتكررة (قهوة، شاي، مكسرات)، اقترح حجماً أكبر أو عدداً أكبر بخصم تدريجي." },
          { type: "list", items: [
            "استخدم طريقة عرض \"Buy More Save More\"",
            "مثال: \"كيلو مقابل 50 ⃁، أو 3 كيلو مقابل 130 ⃁\"",
            "هذا يرفع قيمة السلة ويقلل تكرار الشراء لصالحك ولصالح العميل"
          ]},
          { type: "heading", text: "استراتيجية 3: تكملة الطلب" },
          { type: "paragraph", text: "عندما يضع عميل منتجاً في سلته، اقترح منتجاً يكمله طبيعياً." },
          { type: "list", items: [
            "قهوة → أضف سكراً أو حليباً أو بسكويت",
            "شاي → أضف عسل أو زعتر مجفف",
            "مكسرات → أضف توت مجفف أو شوكولاتة"
          ]},
          { type: "heading", text: "استراتيجية 4: الاشتراكات الدورية" },
          { type: "paragraph", text: "للمنتجات التي تُشترى بانتظام، اقترح خيار الاشتراك الشهري بخصم ثابت. هذا يحوّل الشراء العشوائي لإيراد متكرر منتظم." },
          { type: "tip", text: "ابدأ باستراتيجية \"تكملة الطلب\" لأنها الأبسط والأسرع نتيجة لمتاجر الغذاء والمشروبات. طبّقها على صفحة السلة وستلاحظ فرقاً خلال أسبوع." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Food and beverage stores have a naturally high repeat purchase rate — the challenge is increasing each order's value and converting random buyers into regular subscribers." },
          { type: "heading", text: "Strategy 1: Combo Meals and Bundles" },
          { type: "paragraph", text: "Combining complementary products (drink + meal + dessert) in a bundle at a better price than individual purchases. This increases order value and saves the customer time." },
          { type: "list", items: [
            "Study the most popular product combinations customers already buy together",
            "Create an official bundle at 10–15% less than buying individually",
            "Display it on the product page and cart page"
          ]},
          { type: "heading", text: "Strategy 2: Larger Quantities at Better Prices" },
          { type: "paragraph", text: "For recurring consumable products (coffee, tea, nuts), suggest a larger size or greater quantity with a tiered discount." },
          { type: "list", items: [
            "Use the \"Buy More Save More\" display method",
            "Example: \"1 kg for 50 SAR, or 3 kg for 130 SAR\"",
            "This increases cart value and reduces purchase frequency benefiting both you and the customer"
          ]},
          { type: "heading", text: "Strategy 3: Order Completion" },
          { type: "paragraph", text: "When a customer adds a product to their cart, suggest a product that naturally complements it." },
          { type: "list", items: [
            "Coffee → Add sugar, milk, or biscuits",
            "Tea → Add honey or dried thyme",
            "Nuts → Add dried berries or chocolate"
          ]},
          { type: "heading", text: "Strategy 4: Recurring Subscriptions" },
          { type: "paragraph", text: "For products that are purchased regularly, suggest a monthly subscription option with a fixed discount. This transforms random purchases into regular recurring revenue." },
          { type: "tip", text: "Start with the \"Order Completion\" strategy as it's the simplest and fastest-yielding for food and beverage stores. Apply it on the cart page and you'll notice a difference within a week." },
        ],
      },
      {
        id: "strategies-beauty",
        categoryId: "strategies",
        title: "تعظيم الأرباح لمتاجر الجمال والعناية",
        titleEn: "Maximizing Profits for Beauty & Care Stores",
        desc: "روتين العناية الكاملة وتوصيات المنتجات المكملة لرفع سلة الجمال.",
        descEn: "Complete care routines and complementary product recommendations to grow the beauty cart.",
        time: "11 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "متاجر الجمال والعناية تملك ميزة فريدة: عملاؤها يبحثون عن روتين متكامل وليس منتجاً واحداً. الاستراتيجيات الصحيحة تحول هذا البحث لفرصة رفع السلة بشكل كبير." },
          { type: "heading", text: "استراتيجية 1: روتين العناية الكاملة" },
          { type: "paragraph", text: "أقوى استراتيجية في الجمال. عندما يشاهد عميل كريم مرطب، اقترح منظف البشرة والسيروم والواقي الشمسي كـ \"روتين كامل\"." },
          { type: "numbered", items: [
            "صنّف منتجاتك في خطوات الروتين: تنظيف، تحضير، علاج، ترطيب، حماية",
            "أنشئ وسوم مشتركة للمنتجات التي تعمل معاً",
            "اعرض \"الروتين الكامل\" كحزمة على صفحة كل منتج",
            "استخدم قصص نجاح وصور قبل وبعد لإقناع العميل"
          ]},
          { type: "heading", text: "استراتيجية 2: المكمّلات حسب نوع البشرة" },
          { type: "paragraph", text: "إذا اشترى عميل منتجاً لبشرة دهنية، اقترح له منتجات أخرى لنفس النوع. هذا التخصيص يرفع الثقة ونسبة الشراء." },
          { type: "list", items: [
            "أضف في أوصاف المنتجات نوع البشرة المناسب",
            "استخدم وسوم مثل \"بشرة_دهنية\" و\"بشرة_جافة\" و\"بشرة_مختلطة\"",
            "أنشئ قواعد استهداف بناءً على الفئات التي اشترى منها العميل سابقاً"
          ]},
          { type: "heading", text: "استراتيجية 3: حجم التجربة والحجم الكبير" },
          { type: "paragraph", text: "اقترح حجم صغير للتجربة أولاً، ثم على صفحة الشكر اقترح الحجم الكبير بخصم. هذا يبني الثقة ويرفع قيمة العميل مدى الحياة." },
          { type: "heading", text: "مؤشرات الأداء لمتاجر الجمال" },
          { type: "list", items: [
            "متوسط المنتجات في السلة: هدف 3+ منتجات لكل طلب",
            "نسبة العملاء المتكررين: هدف 40% من الطلبات",
            "نسبة شراء روتين كامل: هدف 15-25%"
          ]},
          { type: "tip", text: "موسم رمضان هو الأعلى مبيعاً لمتاجر الجمال في السعودية. استعد بحزم \"روتين رمضان\" 4 أسابيع قبل الشهر الكريم وفعّل الحملات في اليوم الأول." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Beauty and care stores have a unique advantage: their customers are looking for a complete routine, not just a single product. The right strategies turn this search into a significant cart value increase opportunity." },
          { type: "heading", text: "Strategy 1: Complete Care Routine" },
          { type: "paragraph", text: "The strongest strategy in beauty. When a customer views a moisturizing cream, suggest the facial cleanser, serum, and sunscreen as a \"complete routine.\"" },
          { type: "numbered", items: [
            "Classify your products into routine steps: cleansing, preparation, treatment, moisturizing, protection",
            "Create shared tags for products that work together",
            "Display the \"Complete Routine\" as a bundle on each product page",
            "Use success stories and before-and-after photos to convince the customer"
          ]},
          { type: "heading", text: "Strategy 2: Skin Type Complements" },
          { type: "paragraph", text: "If a customer buys a product for oily skin, suggest other products for the same skin type. This personalization increases trust and purchase rates." },
          { type: "list", items: [
            "Add the suitable skin type in product descriptions",
            "Use tags like \"oily_skin,\" \"dry_skin,\" and \"combination_skin\"",
            "Create targeting rules based on categories the customer has previously purchased from"
          ]},
          { type: "heading", text: "Strategy 3: Trial Size and Full Size" },
          { type: "paragraph", text: "Suggest a small trial size first, then on the thank you page suggest the full size at a discount. This builds trust and increases customer lifetime value." },
          { type: "heading", text: "Performance Indicators for Beauty Stores" },
          { type: "list", items: [
            "Average products per cart: Goal of 3+ products per order",
            "Repeat customer rate: Goal of 40% of orders",
            "Complete routine purchase rate: Goal of 15–25%"
          ]},
          { type: "tip", text: "Ramadan season is the highest-selling period for beauty stores in Saudi Arabia. Prepare \"Ramadan Routine\" bundles 4 weeks before the holy month and activate campaigns on day one." },
        ],
      },
      {
        id: "strategies-data",
        categoryId: "strategies",
        title: "كيف تستخدم البيانات لتحسين أداء حملاتك",
        titleEn: "Using Data to Improve Campaign Performance",
        desc: "قراءة تقارير التحليلات واتخاذ قرارات ذكية بناءً على البيانات.",
        descEn: "Reading analytics reports and making smart decisions based on data.",
        time: "12 دقائق",
        timeEn: "6 min",
        sections: [
          { type: "paragraph", text: "البيانات هي الفرق بين التخمين والقرارات الذكية. تعلّم كيف تقرأ تقارير زيادة لتتخذ قرارات تحسّن نتائجك باستمرار." },
          { type: "heading", text: "تقرير 1: أداء الحملات" },
          { type: "paragraph", text: "أهم تقرير تبدأ به أسبوعياً. يعرض الإيراد الإضافي، نسبة النقر، ونسبة التحويل لكل حملة." },
          { type: "list", items: [
            "ابحث عن الحملة ذات أعلى CTR - هذه الحملة يجب توسيعها",
            "ابحث عن الحملة ذات أعلى نسبة تحويل - هذه لديها تجربة مستخدم ممتازة",
            "أوقف الحملات التي لا تتجاوز CTR 0.5% بعد أسبوع كامل"
          ]},
          { type: "heading", text: "تقرير 2: المنتجات الأكثر توصية وشراءً" },
          { type: "paragraph", text: "يعرض أي المنتجات تُقترح أكثر وأيها يُشترى فعلاً من التوصيات. الفجوة بين الاثنين مؤشر على مشاكل في التسعير أو الصور." },
          { type: "heading", text: "تقرير 3: رحلة العميل" },
          { type: "paragraph", text: "يتتبع المسار الكامل من رؤية التوصية حتى الشراء. إذا كان العميل ينقر لكن لا يشتري، المشكلة في صفحة المنتج وليس في التوصية." },
          { type: "heading", text: "إطار اتخاذ القرار بناءً على البيانات" },
          { type: "numbered", items: [
            "حدد مؤشراً واحداً تريد تحسينه هذا الأسبوع (مثل CTR)",
            "اعرض التقرير وحدد الحملات الأضعف في هذا المؤشر",
            "افرض تغييراً واحداً فقط (مثل تغيير طريقة العرض)",
            "انتظر 5 أيام وراقب النتيجة",
            "إذا تحسّن المؤشر، استمر. إذا لم يتحسن، جرب تغييراً آخر"
          ]},
          { type: "tip", text: "لا تغير أكثر من متغير واحد في وقت واحد. إذا غيرت الهدف وطريقة العرض ونقطة الاقتراح في نفس الوقت، لن تعرف أيها أحدث الفرق." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Data is the difference between guessing and smart decisions. Learn how to read Ziadah's reports to make decisions that continuously improve your results." },
          { type: "heading", text: "Report 1: Campaign Performance" },
          { type: "paragraph", text: "The most important report to start with weekly. It shows additional revenue, click-through rate, and conversion rate for each campaign." },
          { type: "list", items: [
            "Look for the campaign with the highest CTR — this campaign should be expanded",
            "Look for the campaign with the highest conversion rate — this one has an excellent user experience",
            "Pause campaigns that don't exceed 0.5% CTR after a full week"
          ]},
          { type: "heading", text: "Report 2: Most Recommended and Purchased Products" },
          { type: "paragraph", text: "Shows which products are recommended most and which are actually purchased from recommendations. The gap between the two indicates pricing or image issues." },
          { type: "heading", text: "Report 3: Customer Journey" },
          { type: "paragraph", text: "Tracks the complete path from seeing the recommendation to purchasing. If the customer clicks but doesn't buy, the problem is on the product page, not the recommendation." },
          { type: "heading", text: "Data-Driven Decision-Making Framework" },
          { type: "numbered", items: [
            "Identify one metric you want to improve this week (e.g., CTR)",
            "View the report and identify the weakest campaigns for this metric",
            "Make only one change (e.g., change the display method)",
            "Wait 5 days and monitor the result",
            "If the metric improves, continue. If not, try a different change"
          ]},
          { type: "tip", text: "Don't change more than one variable at a time. If you change the goal, display method, and suggestion point all at once, you won't know which one made the difference." },
        ],
      },
      {
        id: "strategies-seasons",
        categoryId: "strategies",
        title: "موسم الأعياد والمناسبات - دليل الاستعداد",
        titleEn: "Holiday Season Preparation Guide",
        desc: "كيف تعد متجرك وزيادة لموسم رمضان والجمعة السوداء والأعياد.",
        descEn: "How to prepare your store and Ziadah for Ramadan, Black Friday, and holidays.",
        time: "8 دقائق",
        timeEn: "5 min",
        sections: [
          { type: "paragraph", text: "المواسم الكبرى تمثل 30-40% من مبيعات السنة لكثير من المتاجر. التحضير الجيد مسبقاً يعني فرقاً كبيراً في الأرقام النهائية." },
          { type: "heading", text: "رمضان الكريم" },
          { type: "paragraph", text: "أهم موسم للمتاجر السعودية. التجار الناجحون يبدأون التحضير قبل 4-6 أسابيع." },
          { type: "numbered", items: [
            "قبل 4 أسابيع: راجع منتجاتك وأضف منتجات موسمية خاصة برمضان",
            "قبل 3 أسابيع: أنشئ حزم رمضانية (مثلاً: طقم قهوة وتمر وحلويات)",
            "قبل أسبوعين: فعّل حملات رمضانية خاصة بنقاط الاقتراح المناسبة",
            "قبل أسبوع: اختبر جميع الحملات وتأكد من صحة التوصيات",
            "خلال رمضان: راقب التحليلات يومياً وعدّل الحملات الضعيفة"
          ]},
          { type: "heading", text: "الجمعة السوداء وسايبر مانداي" },
          { type: "paragraph", text: "فرصة ذهبية لاستخدام الكوبونات الذكية. اعرض خصومات تتصاعد بزيادة قيمة السلة - كلما أضاف العميل أكثر، كلما حصل على خصم أكبر." },
          { type: "list", items: [
            "سلة 200 ⃁ → خصم 10%",
            "سلة 400 ⃁ → خصم 15%",
            "سلة 600 ⃁ → خصم 20%"
          ]},
          { type: "heading", text: "العيد الوطني وعيد الفطر وعيد الأضحى" },
          { type: "paragraph", text: "هذه المناسبات مثالية لتوصيات هدايا \"طقم متكامل\" بتغليف مميز. الحزم الجاهزة كهدايا لها معدل تحويل أعلى بكثير من المنتجات الفردية." },
          { type: "tip", text: "أنشئ حملات موسمية ذكية تُفعَّل وتُوقف تلقائياً في تواريخ محددة. هذا يوفر عليك الجهد ويضمن أن كل موسم يحصل على حملته المناسبة تماماً." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Major seasons represent 30-40% of annual sales for many stores. Proper advance preparation means a significant difference in final numbers." },
          { type: "heading", text: "Ramadan" },
          { type: "paragraph", text: "The most important season for Saudi stores. Successful merchants start preparation 4-6 weeks in advance." },
          { type: "numbered", items: [
            "4 weeks before: Review your products and add Ramadan-specific seasonal items",
            "3 weeks before: Create Ramadan bundles (e.g., coffee, dates, and sweets set)",
            "2 weeks before: Activate special Ramadan campaigns at appropriate suggestion points",
            "1 week before: Test all campaigns and verify recommendation accuracy",
            "During Ramadan: Monitor analytics daily and adjust underperforming campaigns"
          ]},
          { type: "heading", text: "Black Friday & Cyber Monday" },
          { type: "paragraph", text: "A golden opportunity to use smart coupons. Offer discounts that escalate with cart value — the more the customer adds, the bigger the discount." },
          { type: "list", items: [
            "Cart SAR 200 → 10% off",
            "Cart SAR 400 → 15% off",
            "Cart SAR 600 → 20% off"
          ]},
          { type: "heading", text: "National Day, Eid Al-Fitr & Eid Al-Adha" },
          { type: "paragraph", text: "These occasions are ideal for gift recommendations as 'complete sets' with premium packaging. Ready-made gift bundles have a much higher conversion rate than individual products." },
          { type: "tip", text: "Create smart seasonal campaigns that activate and deactivate automatically on specific dates. This saves you effort and ensures each season gets its perfectly timed campaign." },
        ],
      },
      {
        id: "strategies-roi",
        categoryId: "strategies",
        title: "قياس عائد الاستثمار من زيادة بدقة",
        titleEn: "Accurately Measuring ROI from Ziadah",
        desc: "كيف تحسب صافي العائد مع مراعاة تكلفة الاشتراك والإيرادات الإضافية.",
        descEn: "Step-by-step method to calculate the exact return on your investment in Ziadah.",
        time: "7 دقائق",
        timeEn: "4 min",
        sections: [
          { type: "paragraph", text: "زيادة استثمار، وكل استثمار يحتاج حساب عائد. هذا الدليل يعطيك معادلة واضحة لحساب ROI بدقة وتحديد هل أنت تستفيد فعلاً أم لا." },
          { type: "heading", text: "معادلة حساب العائد" },
          { type: "paragraph", text: "ROI = ((الإيراد الإضافي - تكلفة الاشتراك) / تكلفة الاشتراك) × 100" },
          { type: "heading", text: "كيف تحسب الإيراد الإضافي" },
          { type: "paragraph", text: "الإيراد الإضافي هو المبلغ الذي لم تكن ستحصل عليه لولا زيادة. لوحة التحكم تحسبه تلقائياً، لكن هذا كيف يُحتسب:" },
          { type: "list", items: [
            "الطريقة المحافظة: الإيراد من المنتجات المقترحة التي أُضيفت للسلة مباشرة من التوصية",
            "الطريقة الشاملة: زيادة متوسط قيمة السلة مضروبة في عدد الطلبات الكلي",
            "الطريقة الدقيقة: استخدام اختبار A/B مع مجموعة لا ترى التوصيات"
          ]},
          { type: "heading", text: "مثال عملي" },
          { type: "paragraph", text: "متجر لديه 300 طلب شهري بمتوسط 250 ⃁ → إجمالي 75,000 ⃁. بعد زيادة، المتوسط ارتفع لـ 320 ⃁ → إجمالي 96,000 ⃁. الإيراد الإضافي = 21,000 ⃁. إذا كان الاشتراك 1,000 ⃁ شهرياً، فالـ ROI = (21,000 - 1,000) / 1,000 × 100 = 2000%" },
          { type: "heading", text: "مؤشرات المتجر الناجح مع زيادة" },
          { type: "list", items: [
            "ROI إيجابي بعد شهر: علامة صحة جيدة",
            "ROI فوق 500% بعد 3 أشهر: أداء ممتاز",
            "إذا كان ROI سلبياً بعد شهر: راجع إعدادات الحملات"
          ]},
          { type: "tip", text: "لا تحسب ROI في أول 2 أسبوع. انتظر على الأقل شهراً كاملاً لتحصل على بيانات كافية للحكم الصحيح على العائد." },
        ],
        sectionsEn: [
          { type: "paragraph", text: "Ziadah is an investment, and every investment needs an ROI calculation. This guide gives you a clear formula to accurately calculate ROI and determine whether you're truly benefiting." },
          { type: "heading", text: "ROI Calculation Formula" },
          { type: "paragraph", text: "ROI = ((Additional Revenue - Subscription Cost) / Subscription Cost) × 100" },
          { type: "heading", text: "How to Calculate Additional Revenue" },
          { type: "paragraph", text: "Additional revenue is the amount you wouldn't have earned without Ziadah. The dashboard calculates it automatically, but here's how it's computed:" },
          { type: "list", items: [
            "Conservative method: Revenue from recommended products added to cart directly from the recommendation",
            "Comprehensive method: Increase in average cart value multiplied by total number of orders",
            "Precise method: Using A/B testing with a control group that doesn't see recommendations"
          ]},
          { type: "heading", text: "Practical Example" },
          { type: "paragraph", text: "A store with 300 monthly orders averaging SAR 250 → total SAR 75,000. After Ziadah, the average rose to SAR 320 → total SAR 96,000. Additional revenue = SAR 21,000. If the subscription is SAR 1,000/month, ROI = (21,000 - 1,000) / 1,000 × 100 = 2000%" },
          { type: "heading", text: "Indicators of a Successful Store with Ziadah" },
          { type: "list", items: [
            "Positive ROI after 1 month: A healthy sign",
            "ROI above 500% after 3 months: Excellent performance",
            "If ROI is negative after 1 month: Review campaign settings"
          ]},
          { type: "tip", text: "Don't calculate ROI in the first 2 weeks. Wait at least a full month to get enough data for an accurate assessment of the return." },
        ],
      },
    ],
  },
];

export const videoLibrary = [
  {
    id: "v1",
    title: "مقدمة إلى زيادة - نظرة عامة",
    description: "تعرف على زيادة وكيف يساعد متجرك على زيادة المبيعات بالذكاء الاصطناعي",
    youtubeId: "PLACEHOLDER_V1",
    duration: "5:32",
    category: "البداية"
  },
  {
    id: "v2",
    title: "إعداد أول حملة خطوة بخطوة",
    description: "فيديو تفصيلي لإنشاء حملتك الأولى من الصفر وحتى النشر",
    youtubeId: "PLACEHOLDER_V2",
    duration: "8:15",
    category: "البداية"
  },
  {
    id: "v3",
    title: "فهم لوحة التحليلات",
    description: "كيف تقرأ أرقام لوحة التحكم وتستخرج منها قرارات ذكية",
    youtubeId: "PLACEHOLDER_V3",
    duration: "6:48",
    category: "التحليلات"
  },
  {
    id: "v4",
    title: "استراتيجيات البيع الإضافي للمبتدئين",
    description: "أفضل استراتيجيات Upsell وCross-sell لرفع متوسط قيمة السلة",
    youtubeId: "PLACEHOLDER_V4",
    duration: "11:20",
    category: "الاستراتيجيات"
  },
  {
    id: "v5",
    title: "تكامل زيادة مع منصة زد",
    description: "دليل مرئي كامل لربط زيادة بمتجرك على منصة زد",
    youtubeId: "PLACEHOLDER_V5",
    duration: "7:05",
    category: "التقنية"
  },
  {
    id: "v6",
    title: "قصص نجاح تجار سعوديين مع زيادة",
    description: "تجارب حقيقية من تجار حققوا نتائج رائعة مع زيادة",
    youtubeId: "PLACEHOLDER_V6",
    duration: "14:30",
    category: "قصص النجاح"
  },
];

export function getArticleById(id: string): FullArticle | undefined {
  for (const cat of categories) {
    const article = cat.articles.find(a => a.id === id);
    if (article) return article;
  }
  return undefined;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function searchArticles(query: string): (FullArticle & { categoryLabel: string; categoryColor: string })[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: (FullArticle & { categoryLabel: string; categoryColor: string })[] = [];
  for (const cat of categories) {
    for (const article of cat.articles) {
      if (
        article.title.includes(query) ||
        article.desc.includes(query) ||
        (article.titleEn && article.titleEn.toLowerCase().includes(q)) ||
        (article.descEn && article.descEn.toLowerCase().includes(q))
      ) {
        results.push({ ...article, categoryLabel: cat.label, categoryColor: cat.color });
      }
    }
  }
  return results;
}
