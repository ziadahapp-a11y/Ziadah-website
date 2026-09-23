import type { SectorDeepDive } from "../sectorDeepDive";

export const serviceDesignDeepDive: SectorDeepDive = {
  slug: "service-design",
  introAr:
    "الخدمة لا تُشترى من الرف: العميل يشرح ما يريد، ويستلم شيئاً صُنع له وحده. الوحدة هنا نطاق عمل لا منتج، والخلاف الأول دائماً على حدود النطاق: كم تعديل، وكم صيغة، وكم يوم. لذلك اللحظات أدناه تبيع وضوحاً قبل أن تبيع إضافة — الباقة التي تمنع خلافاً تساوي أكثر من الباقة التي ترفع السعر.",
  introEn:
    "A service is not bought off a shelf: the client explains what they want and receives something made only for them. The unit is a scope, not a product, and the first argument is always about the edges of that scope: how many revisions, how many formats, how many days. So the moments below sell clarity before they sell an add-on - a package that prevents a dispute is worth more than one that raises the price.",
  useCases: [
    {
      key: "scope-tiers",
      titleAr: "ثلاث باقات بحدود مكتوبة",
      titleEn: "Three packages with written edges",
      triggerAr: "العميل يطلب عرض سعر لخدمة.",
      triggerEn: "The client asks for a quote.",
      scenarioAr:
        "تُعرض ثلاث باقات يختلف فيها المُسلَّم بوضوح: عدد التعديلات، الصيغ، مدة التسليم. الفروق ملموسة لا غامضة.",
      scenarioEn:
        "Three packages whose deliverables differ plainly: revision count, formats, turnaround. The differences are concrete rather than vague.",
      whyAr:
        "الباقة الوسطى تُختار أكثر حين يكون للعليا وجود واضح. والأهم أن الحدود المكتوبة تمنع الخلاف الذي يأكل ربح المشروع كله.",
      whyEn:
        "The middle package wins more often when the top one visibly exists. More importantly, written edges prevent the dispute that eats a project's entire margin.",
      exampleAr: "شعار: أساسي تعديلان ٧ أيام · متكامل ٥ تعديلات وهوية · شامل بلا حد و٣ أيام.",
      exampleEn: "A logo: Basic, 2 revisions, 7 days · Complete, 5 revisions plus identity · Full, unlimited, 3 days.",
    },
    {
      key: "rush-fee",
      titleAr: "الاستعجال كخدمة مسعّرة",
      titleEn: "Rush as a priced service",
      triggerAr: "العميل يسأل عن تسليم أسرع من المعتاد.",
      triggerEn: "The client asks for faster delivery than standard.",
      scenarioAr:
        "يُعرض التسليم المستعجل بسعره صراحة بدل الوعد المجاني: «٤٨ ساعة بدل ٧ أيام، +٤٠٪».",
      scenarioEn:
        "Rush delivery is priced plainly instead of promised free: \"48 hours instead of 7 days, +40%\".",
      whyAr:
        "الاستعجال المجاني يُعلّم العميل أن الجدول قابل للضغط دائماً، ويدمّر جدول المشاريع الأخرى. تسعيره يجعله خياراً لا عادة.",
      whyEn:
        "Free rushing teaches the client that the schedule is always squeezable and wrecks every other project's timeline. Pricing it makes it a choice rather than a habit.",
      exampleAr: "طلب تسليم خلال يومين ← «مستعجل ٤٨ ساعة، +٤٠٪ على الباقة».",
      exampleEn: "A two-day request → \"Rush, 48 hours, +40% on the package\".",
    },
    {
      key: "source-files",
      titleAr: "ملفات المصدر كبند لا كمنّة",
      titleEn: "Source files as a line item, not a favour",
      triggerAr: "المشروع قارب على التسليم.",
      triggerEn: "The project nears delivery.",
      scenarioAr:
        "تُعرض ملفات المصدر القابلة للتعديل كبند واضح. العميل الذي يريد التعديل لاحقاً يشتريها، والذي لا يريد لا يدفع.",
      scenarioEn:
        "Editable source files appear as a clear line item. A client who wants to edit later buys them; one who does not, does not pay for them.",
      whyAr:
        "معظم النزاعات بعد التسليم على ملفات المصدر. جعلها بنداً مسعّراً من البداية ينهي النقاش ويضيف إيراداً.",
      whyEn:
        "Most post-delivery disputes are about source files. Making them a priced line item up front ends the argument and adds revenue.",
      exampleAr: "تصميم هوية ← «ملفات المصدر AI وPSD، ٦٠٠ ر.س» بند في العرض.",
      exampleEn: "A brand identity → \"AI and PSD source files, 600 SAR\" as a line in the quote.",
    },
    {
      key: "retainer",
      titleAr: "العقد الشهري بدل المشروع المتكرر",
      titleEn: "A monthly retainer instead of repeated projects",
      triggerAr: "العميل طلب ثلاثة مشاريع صغيرة خلال أشهر.",
      triggerEn: "The client has ordered three small projects over a few months.",
      scenarioAr:
        "يُعرض عقد شهري بساعات محددة بدل تسعير كل طلب على حدة. العميل يربح ثباتاً والمزوّد يربح توقعاً.",
      scenarioEn:
        "A monthly retainer with a set number of hours is offered instead of quoting each request. The client gains predictability and the provider gains a forecast.",
      whyAr:
        "المشروع المتكرر يعني تفاوضاً متكرراً وفجوات دخل. العقد يحوّل العميل نفسه من متقلب إلى ثابت بلا بيع جديد.",
      whyEn:
        "Repeated projects mean repeated negotiation and income gaps. A retainer turns the same client from volatile to steady with no new sale at all.",
      exampleAr: "٣ طلبات في ٤ أشهر ← «عقد شهري ٢٠ ساعة، ٤٬٥٠٠ بدل التسعير كل مرة».",
      exampleEn: "3 requests in 4 months → \"A 20-hour monthly retainer at 4,500, instead of quoting each time\".",
    },
    {
      key: "complementary-service",
      titleAr: "الخدمة التي تُكمل المُسلَّم",
      titleEn: "The service that completes the deliverable",
      triggerAr: "المشروع سُلّم ونجح.",
      triggerEn: "The project is delivered and landed well.",
      scenarioAr:
        "تُعرض الخدمة التالية منطقياً: الهوية بعد الشعار، الموقع بعد الهوية. اللحظة الصحيحة هي بعد الرضا لا أثناء التنفيذ.",
      scenarioEn:
        "The logically next service is offered: identity after a logo, a website after the identity. The right moment is after satisfaction, never mid-project.",
      whyAr:
        "بيع الخدمة الثانية أثناء الأولى يقرأ كتشتيت ويهدد الأولى. بيعها بعد التسليم الناجح يقرأ كخطوة طبيعية.",
      whyEn:
        "Selling the second service during the first reads as a distraction and endangers the first. Selling it after a successful delivery reads as the obvious next step.",
      exampleAr: "شعار سُلّم ← بعد أسبوع: «دليل الهوية الكامل، ٣٬٢٠٠».",
      exampleEn: "A logo delivered → a week later: \"The full brand guidelines, 3,200\".",
    },
    {
      key: "brief-quality",
      titleAr: "بريف أفضل يعني مشروعاً أرخص",
      titleEn: "A better brief means a cheaper project",
      triggerAr: "العميل يملأ نموذج الطلب.",
      triggerEn: "The client is filling in the request form.",
      scenarioAr:
        "تُقترح الحقول الناقصة وأمثلة مرجعية أثناء التعبئة. البريف الناقص يعني جولات تعديل، والتعديل تكلفة على الطرفين.",
      scenarioEn:
        "Missing fields and reference examples are suggested as they type. A thin brief means revision rounds, and revisions cost both sides.",
      whyAr:
        "كل معلومة تُلتقط في البريف توفّر جولة تعديل. هذا الاقتراح لا يرفع السعر لكنه يرفع الهامش أكثر من أي إضافة.",
      whyEn:
        "Every fact captured in the brief saves a revision round. This suggestion raises no price but raises margin more than any add-on does.",
      exampleAr: "نموذج بلا ألوان مفضلة ← «أضف ٣ أمثلة تعجبك، يختصر جولة تعديل».",
      exampleEn: "A form with no colour preference → \"Add 3 examples you like - it saves a revision round\".",
    },
  ],
};
