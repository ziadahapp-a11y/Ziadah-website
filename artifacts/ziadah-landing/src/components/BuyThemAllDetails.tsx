import { Shell } from "@/components/mk";
import { Section, SectionHead, CardsGrid } from "@/sections";

/*
 * Everything below is read off the campaign builder's own screens in the
 * product design file (steps 03 Rewards, 04 Campaign Rules and 05 Content &
 * Style, and the storefront states). It lists what the merchant can set; it
 * does not claim any result. One reward type per campaign, as the builder says.
 */

type Group = { key: string; title: string; body: string; items: string[] };

const REWARDS_AR: Group[] = [
  {
    key: "fixed",
    title: "سعر ثابت للباندل",
    body: "سعر واحد للمجموعة كاملة، بدل مجموع أسعار منتجاتها.",
    items: [
      "تكتب سعر الباندل بالريال",
      "تظهر لك مجموع أسعار المنتجات منفصلة",
      "يحسب لك الودجت ما يوفره العميل بالريال وبالنسبة",
    ],
  },
  {
    key: "percent",
    title: "خصم بنسبة",
    body: "نسبة مئوية من أسعار المنتجات المختارة.",
    items: [
      "نسبة الخصم (%)",
      "حد أقصى للخصم بالريال، اختياري",
      "تطبّق النسبة على: المجموعة كاملة، أو أرخص منتج، أو كل منتج على حدة",
      "تقريب الخصم لأقرب ريال للأسفل",
      "إظهار شارة النسبة على بطاقات المنتجات",
    ],
  },
  {
    key: "amount",
    title: "خصم بمبلغ",
    body: "مبلغ ثابت بالريال يُخصم من المجموعة.",
    items: [
      "مبلغ الخصم بالريال",
      "يُطبَّق مرة واحدة على الباندل، أو على كل منتج",
      "أو يُوزَّع على المنتجات بحسب أسعارها",
    ],
  },
  {
    key: "gift",
    title: "هدية فقط",
    body: "بلا خصم، العميل يحصل على هدية عند إكمال المجموعة.",
    items: [
      "تختار منتجات الهدايا وأقصى كمية لكل هدية",
      "العميل يختار هدية واحدة، أو عدة هدايا",
      "أو تُضاف له كل الهدايا تلقائياً («أعطهم الكل»)",
    ],
  },
  {
    key: "cashback",
    title: "استرداد نقدي (كاش باك)",
    body: "مبلغ يعود إلى محفظة العميل بدل خصمه من السعر.",
    items: [
      "النوع: مبلغ ثابت بالريال، أو نسبة من قيمة الباندل",
      "حد أقصى للاسترداد، اختياري",
      "يُضاف بعد الدفع، أو بعد التوصيل، أو بعد انتهاء مهلة الإرجاع",
      "مدة صلاحية الاسترداد بالأيام",
      "حد أدنى لقيمة الباندل، اختياري",
      "إظهار شارة الاسترداد على البطاقات وسطره في السلة",
    ],
  },
];

const REWARDS_EN: Group[] = [
  {
    key: "fixed",
    title: "Fixed bundle price",
    body: "One price for the whole set, instead of the sum of its products.",
    items: [
      "You enter the bundle price in riyals",
      "The sum of the products on their own is shown next to it",
      "The widget works out what the shopper saves, in riyals and as a percentage",
    ],
  },
  {
    key: "percent",
    title: "Percentage off",
    body: "A percent off the products in the set.",
    items: [
      "The discount percentage (%)",
      "A maximum discount in riyals, optional",
      "Apply the percentage to: the whole bundle, the cheapest item, or each item separately",
      "Round the discount down to the nearest riyal",
      "Show the percent badge on the product cards",
    ],
  },
  {
    key: "amount",
    title: "Fixed amount off",
    body: "A flat riyal amount taken off the set.",
    items: [
      "The discount amount in riyals",
      "Applied once per bundle, or on every item",
      "Or split across the items by price",
    ],
  },
  {
    key: "gift",
    title: "Free gift only",
    body: "No discount. The shopper gets a gift when the set is complete.",
    items: [
      "You choose the gift products and the maximum quantity of each",
      "The shopper picks one gift, or several",
      "Or every gift is added automatically (Give them all)",
    ],
  },
  {
    key: "cashback",
    title: "Cashback",
    body: "Money goes back to the shopper's wallet instead of coming off the price.",
    items: [
      "Type: a fixed amount in riyals, or a percentage of the bundle",
      "A maximum cashback, optional",
      "Credited after payment, after delivery, or after the return window",
      "How many days the cashback lasts before it expires",
      "A minimum bundle value, optional",
      "Show the cashback badge on the cards and its line in the cart",
    ],
  },
];

const WHEN_AR: Group[] = [
  {
    key: "trigger",
    title: "متى تظهر المجموعة",
    body: "تختار الحدث الذي يفتح العرض عند العميل.",
    items: [
      "عرض صفحة المنتج، أو عرض الصفحة الرئيسية، أو عرض تصنيف",
      "إضافة منتج للسلة، أو عرض السلة",
      "حذف منتج من السلة، أو بدء إتمام الطلب، أو إتمام طلب",
    ],
  },
  {
    key: "products",
    title: "على أي منتجات",
    body: "تحدد أين يظهر العرض في المتجر.",
    items: [
      "منتجات محددة تختارها من قائمة منتجاتك",
      "كل المنتجات",
      "أو بحسب قيمة السلة",
      "طريقة العرض: المنتجات فقط، أو المنتجات مع كوبون",
    ],
  },
  {
    key: "style",
    title: "شكل العرض",
    body: "نافذة فوق الصفحة أو كتلة مضمّنة فيها، بإعداد مستقل للجوال والكمبيوتر.",
    items: [
      "نمط الحملة: نافذة (Overlay) أو مضمّنة (Embedded)",
      "شكل النافذة: منبثقة، أو انزلاق من اليمين أو اليسار، ومن الأسفل على الجوال",
      "شكل المنتجات: انزلاق أفقي أو عمودي، أو شبكة",
      "على صفحة المنتج: فوق زر الإضافة، أو تحت الوصف، أو في تبويب",
    ],
  },
  {
    key: "buttons",
    title: "الأزرار وما بعد الإضافة",
    body: "تتحكم بما يراه العميل ويفعله بعد الضغط.",
    items: [
      "أزرار: «أضف الكل»، وفتح السلة، وإتمام الطلب، وإغلاق النافذة، و«لا تعرضها مرة أخرى»",
      "بعد الإضافة: البقاء في الصفحة، أو التحويل لإتمام الطلب، أو للسلة",
      "إظهار أو إخفاء: السعر الإجمالي، والمعاينة السريعة، والتقييمات، والوسم، وإجمالي السلة مع الضريبة",
      "خيارات المنتج (اللون والمقاس): أزرار أو قوائم منسدلة",
    ],
  },
];

const WHEN_EN: Group[] = [
  {
    key: "trigger",
    title: "When the set appears",
    body: "You choose the event that opens the offer for the shopper.",
    items: [
      "Viewing a product page, the homepage, or a category",
      "Adding to the cart, or viewing the cart",
      "Removing a line item, starting checkout, or placing an order",
    ],
  },
  {
    key: "products",
    title: "On which products",
    body: "You decide where in the store the offer shows.",
    items: [
      "Specific products you pick from your catalogue",
      "All products",
      "Or by cart value",
      "Presentation: products only, or products plus a coupon",
    ],
  },
  {
    key: "style",
    title: "How it looks",
    body: "A window over the page or a block built into it, set separately for mobile and desktop.",
    items: [
      "Campaign style: Overlay or Embedded",
      "Window shape: pop up, sliding in from the right or left, and from the bottom on mobile",
      "Products shape: horizontal sliding, vertical sliding, or grid",
      "On the product page: above Add to cart, below the description, or in a tab",
    ],
  },
  {
    key: "buttons",
    title: "Buttons and after the click",
    body: "You control what the shopper sees and does once they tap.",
    items: [
      "Buttons: Add them all, open cart, checkout, discard the window, and Do not show again",
      "After adding: stay on the page, redirect to checkout, or redirect to the cart",
      "Show or hide: the total items price, quick product view, reviews, product tag, and cart total with VAT",
      "Product options (colour, size): buttons or dropdowns",
    ],
  },
];

function GroupGrid({ groups, columns }: { groups: Group[]; columns: 2 | 3 }) {
  return (
    <CardsGrid
      columns={columns}
      cards={groups.map((g) => ({
        key: g.key,
        title: g.title,
        body: g.body,
        foot: (
          <ul className="grid gap-2 ps-5 list-disc text-start">
            {g.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        ),
      }))}
    />
  );
}

export default function BuyThemAllDetails({ isAr }: { isAr: boolean }) {
  return (
    <>
      <Section id="uc-rewards" family="grey">
        <SectionHead
          center
          kicker={isAr ? "المكافآت" : "Rewards"}
          title={isAr ? "خمسة أنواع مكافآت لعرض «اشترِ الكل»" : "Five reward types for Buy Them All"}
          lead={
            isAr
              ? "تختار نوعاً واحداً لكل حملة في خطوة «المكافآت»، ويمكن إضافة الهدايا والشحن المجاني فوقه."
              : "You pick one type per campaign in the Rewards step, and gifts and free shipping can be added on top."
          }
        />
        <Shell>
          <GroupGrid groups={isAr ? REWARDS_AR : REWARDS_EN} columns={3} />
        </Shell>
      </Section>

      <Section id="uc-rules" family="violet">
        <SectionHead
          center
          kicker={isAr ? "القواعد والمظهر" : "Rules and look"}
          title={isAr ? "متى وأين وبأي شكل تظهر المجموعة" : "When, where and how the set appears"}
          lead={
            isAr
              ? "الخطوتان الرابعة والخامسة في لوحة زيادة، مع معاينة مباشرة للمتجر أثناء التعديل."
              : "Steps four and five in the Ziadah dashboard, with a live store preview while you edit."
          }
        />
        <Shell>
          <GroupGrid groups={isAr ? WHEN_AR : WHEN_EN} columns={2} />
        </Shell>
      </Section>
    </>
  );
}
