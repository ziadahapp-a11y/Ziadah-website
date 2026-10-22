import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import BuyThemAllWidget from "../../components/widgets/BuyThemAllWidget";
import BuyThemAllDetails from "../../components/BuyThemAllDetails";

/*
 * Every figure on this page is read off the product itself (the campaign
 * builder has five steps and five reward types; the sample set is 120 + 85 +
 * 52 = 257, sold as one set at 199). There is no performance number here on
 * purpose: this feature has no measured results yet, and the older pages'
 * percentages are not a precedent to follow.
 */
const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "اشترِ الكل",
    subtitle:
      "مجموعة ثابتة من المنتجات تُضاف للسلة بنقرة واحدة وبسعر واحد. العميل يأخذها كاملة، ولا يستطيع إزالة منتج منها.",
    tagline: "مجموعة كاملة، سعر واحد، نقرة واحدة",
    icon: "",
  },
  whatWeDoTitle: "ما هو عرض «اشترِ الكل» وكيف يعمل في زيادة؟",
  whatWeDoDesc:
    "«اشترِ الكل» (Buy Them All) نوع من عروض الباندل في زيادة. تحدد مجموعة ثابتة من المنتجات، مثل طقم قهوة كامل، فيراها العميل في نافذة واحدة بسعر واحد ويضيفها كلها للسلة بزر «أضف الكل للسلة». المنتجات مقفلة داخل المجموعة، فلا يستطيع العميل إزالة منتج منها. تحدد أنت المنتجات والكمية لكل منتج، ونوع المكافأة، ومتى وأين تظهر المجموعة وبأي شكل، وترى معاينة المتجر مباشرة وأنت تعدّل.",
  strategyTitle: "كيف تُعدّ «اشترِ الكل» في لوحة زيادة",
  strategies: [
    {
      icon: "",
      title: "اختر نوع الباندل",
      desc: "من الحملات، إنشاء حملة مخصصة، ثم «اشترِ الكل بسعر ثابت»: مجموعة ثابتة تُضاف بنقرة واحدة.",
      color: "#8b5cf6",
    },
    {
      icon: "",
      title: "حدّد منتجات المجموعة",
      desc: "تضيف المنتجات وتحدد الكمية لكل منتج، وتكتب عنوان الودجت وعنوانه الفرعي، والمعاينة تتحدث مع كل تعديل.",
      color: "#06b6d4",
    },
    {
      icon: "",
      title: "اختر المكافأة",
      desc: "سعر ثابت للباندل، أو خصم بنسبة، أو خصم بمبلغ، أو هدية فقط، أو استرداد نقدي لمحفظة العميل.",
      color: "#8b5cf6",
    },
    {
      icon: "",
      title: "حدّد القواعد والمظهر",
      desc: "متى تظهر المجموعة وعلى أي منتجات، ثم شكل النافذة (منبثقة أو مضمّنة) وأزرار الإجراء ومكان الظهور.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "1", label: "نقرة تضيف المجموعة كاملة للسلة", color: "#8b5cf6" },
    { value: "1", label: "سعر واحد للمجموعة كاملة", color: "#06b6d4" },
    { value: "5", label: "أنواع مكافآت تختار منها", color: "#8b5cf6" },
    { value: "5", label: "خطوات إعداد من الهدف حتى النشر", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "مثال: طقم إسبريسو",
    steps: [
      "☕ المجموعة: خلطة إسبريسو 1 كجم (120 ر.س) + ضاغط قهوة 58 مم (85 ر.س) + إبريق حليب 600 مل (52 ر.س). مجموعها 257 ر.س إذا اشتراها العميل منفصلة.",
      "🏷️ السعر: تُباع المجموعة بسعر واحد، 199 ر.س في هذا المثال، ويظهر بجانب السعر قبل.",
      "🛒 النقرة: زر «أضف الكل للسلة» يضيف المنتجات الثلاثة معاً، ولا يستطيع العميل إزالة منتج منها.",
    ],
    result: "العميل يرى الطقم كاملاً وسعره في مكان واحد ويضيفه بنقرة واحدة. الأسماء والأسعار توضيحية من مثال في اللوحة.",
  },
  extraSections: (isAr) => (
    <>
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}
      subtitle={
        isAr
          ? "هكذا تبدو مجموعة «اشترِ الكل» كما يراها عميلك"
          : "This is how a Buy Them All set looks to your customer"
      }
      tabs={[
        {
          labelAr: "مثال حي",
          labelEn: "Live Demo",
          content: <BuyThemAllWidget />,
        },
      ]}
    />
    <BuyThemAllDetails isAr={isAr} />
    </>
  ),
  ctaTitle: "فعّل «اشترِ الكل»",
  ctaDesc: "حدّد مجموعتك وسعرها من لوحة زيادة، ويضيفها عميلك بنقرة واحدة.",
  heroEn: {
    tag: "By Display Method",
    title: "Buy Them All",
    subtitle:
      "A fixed set of products added to the cart in one click at one price. The shopper takes the whole set and cannot remove an item from it.",
    tagline: "A full set, one price, one click",
    icon: "",
  },
  whatWeDoTitleEn: "What is a Buy Them All offer and how does it work in Ziadah?",
  whatWeDoDescEn:
    "Buy Them All is a bundle type in Ziadah. You pick a fixed set of products, such as a complete coffee kit, and the shopper sees it in one window at one price and adds all of it with the Add all to cart button. The products are locked inside the set, so the shopper cannot remove one. You choose the products and the quantity of each, the reward, and when, where and how the set appears, and you watch a live store preview while you edit.",
  strategyTitleEn: "How to set up Buy Them All in the Ziadah dashboard",
  strategiesEn: [
    {
      icon: "",
      title: "Choose the bundle type",
      desc: "From Campaigns, Create Custom Campaign, then Buy them all, a fixed set added in one click.",
      color: "#8b5cf6",
    },
    {
      icon: "",
      title: "Pick the products in the set",
      desc: "Add the products and set the quantity of each, and write the widget title and subtitle. The preview updates as you edit.",
      color: "#06b6d4",
    },
    {
      icon: "",
      title: "Choose the reward",
      desc: "A fixed bundle price, a percentage off, a fixed amount off, a free gift only, or cashback to the shopper's wallet.",
      color: "#8b5cf6",
    },
    {
      icon: "",
      title: "Set the rules and the look",
      desc: "When the set appears and on which products, then the window style (overlay or embedded), the action buttons and the placement.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "1", label: "click adds the whole set to the cart", color: "#8b5cf6" },
    { value: "1", label: "price for the whole set", color: "#06b6d4" },
    { value: "5", label: "reward types to choose from", color: "#8b5cf6" },
    { value: "5", label: "setup steps from goal to publish", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Example: an espresso kit",
    steps: [
      "☕ The set: Espresso Blend 1kg (120 SAR) + Tamper 58mm (85 SAR) + Milk Pitcher 600ml (52 SAR). That adds up to 257 SAR if the shopper buys them separately.",
      "🏷️ The price: the set sells at one price, 199 SAR in this example, shown next to the price before.",
      "🛒 The click: the Add all to cart button adds all three products together, and the shopper cannot remove one.",
    ],
    result: "The shopper sees the full kit and its price in one place and adds it in one click. Names and prices are illustrative, taken from an example in the dashboard.",
  },
  ctaTitleEn: "Activate Buy Them All",
  ctaDescEn: "Set your set and its price from the Ziadah dashboard, and your shopper adds it in one click.",
  seo: {
    title: "اشترِ الكل: مجموعة بسعر واحد",
    titleEn: "Buy Them All: a Fixed Set at One Price",
    description:
      "«اشترِ الكل» في زيادة: مجموعة ثابتة من المنتجات تُضاف للسلة بنقرة واحدة وبسعر واحد، لمتاجر زد وسلة. تعرّف على الإعداد وشكلها للعميل.",
    descriptionEn:
      "Ziadah's Buy Them All: a fixed set of products added to the cart in one click at one price, for Zid and Salla stores. See the setup and the shopper view.",
    canonical: "/use-cases/buy-them-all",
  },
};

export default function BuyThemAll() {
  return <UseCaseLayout data={data} />;
}
