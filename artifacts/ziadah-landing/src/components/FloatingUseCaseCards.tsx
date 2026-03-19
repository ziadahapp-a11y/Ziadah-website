import BuyMoreSaveMoreWidget from "./widgets/BuyMoreSaveMoreWidget";
import BuyTogetherWidget from "./widgets/BuyTogetherWidget";
import AddonsWidget from "./widgets/AddonsWidget";
import RelatedProductsWidget from "./widgets/RelatedProductsWidget";
import CouponWidget from "./widgets/CouponWidget";
import FreeShippingThresholdWidget from "./widgets/FreeShippingThresholdWidget";
import ProductSwapWidget from "./widgets/ProductSwapWidget";

const floatingWidgets = [
  { widget: <BuyMoreSaveMoreWidget />, label: "Quantity Offers" },
  { widget: <BuyTogetherWidget />, label: "Buy Together" },
  { widget: <AddonsWidget />, label: "Complementary Add-ons" },
  { widget: <RelatedProductsWidget />, label: "Related Products" },
  { widget: <CouponWidget />, label: "Discount Coupon" },
  { widget: <FreeShippingThresholdWidget />, label: "Free Shipping" },
  { widget: <ProductSwapWidget />, label: "Upsell" },
];

interface CardPosition {
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  delay: number;
  duration: number;
  hideOnMobile: boolean;
}

const cardPositions: CardPosition[] = [
  { top: "2%",   left: "-2%",           rotate: -12, delay: 0,    duration: 7,   hideOnMobile: false },
  { top: "5%",            right: "-3%", rotate: 8,   delay: 1.2,  duration: 8.5, hideOnMobile: false },
  { top: "42%",  left: "-5%",           rotate: -6,  delay: 2.4,  duration: 6.5, hideOnMobile: true  },
  { top: "50%",           right: "-4%", rotate: 10,  delay: 0.7,  duration: 9,   hideOnMobile: true  },
  { top: "25%",  left: "1%",            rotate: -4,  delay: 3.1,  duration: 7.5, hideOnMobile: true  },
  { top: "30%",           right: "0%",  rotate: 5,   delay: 1.8,  duration: 8,   hideOnMobile: true  },
  { top: "70%",  left: "2%",            rotate: -10, delay: 2.0,  duration: 6,   hideOnMobile: true  },
];

export default function FloatingUseCaseCards() {
  return (
    <div className="floating-cards-layer" aria-hidden="true" inert={true}>
      {floatingWidgets.map((fw, i) => {
        const pos = cardPositions[i] ?? cardPositions[0];
        const style: React.CSSProperties & Record<string, string> = {
          top: pos.top,
          animationDelay: `${pos.delay}s`,
          "--dur": `${pos.duration}s`,
          "--r": `${pos.rotate}deg`,
        };
        if (pos.left !== undefined) style.left = pos.left;
        if (pos.right !== undefined) style.right = pos.right;

        return (
          <div
            key={fw.label}
            className={`floating-card${pos.hideOnMobile ? " floating-card--hide-mobile" : ""}`}
            style={style}
          >
            <div className="floating-card-widget">
              {fw.widget}
            </div>
          </div>
        );
      })}
    </div>
  );
}
