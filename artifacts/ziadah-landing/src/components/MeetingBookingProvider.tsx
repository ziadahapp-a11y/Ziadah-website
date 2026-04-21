import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { MEETING_BOOKING_DEFAULT_URL } from "@/config/meetingBooking";

type MeetingBookingContextValue = {
  openMeetingBooking: (bookingUrl?: string) => void;
};

const MeetingBookingContext = createContext<MeetingBookingContextValue | null>(null);

function openBookingInNewTab(bookingUrl: string): void {
  const w = window.open(bookingUrl, "_blank", "noopener,noreferrer");
  if (w) {
    try {
      w.opener = null;
    } catch {
      /* ignore */
    }
  }
}

export function MeetingBookingProvider({ children }: { children: ReactNode }) {
  const openMeetingBooking = useCallback((bookingUrl?: string) => {
    const u = bookingUrl ?? MEETING_BOOKING_DEFAULT_URL;
    openBookingInNewTab(u);
  }, []);

  const value = useMemo(
    () => ({ openMeetingBooking }),
    [openMeetingBooking]
  );

  return (
    <MeetingBookingContext.Provider value={value}>
      {children}
    </MeetingBookingContext.Provider>
  );
}

export function useMeetingBooking(): MeetingBookingContextValue {
  const ctx = useContext(MeetingBookingContext);
  if (!ctx) {
    throw new Error("useMeetingBooking must be used within MeetingBookingProvider");
  }
  return ctx;
}
