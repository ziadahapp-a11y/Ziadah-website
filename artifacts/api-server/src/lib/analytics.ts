/**
 * Vercel Web Analytics integration for server-side event tracking.
 * 
 * While Vercel Web Analytics is primarily designed for client-side page view tracking,
 * the server-side API allows tracking custom events from the backend.
 * 
 * @see https://vercel.com/docs/analytics
 */
import { track } from "@vercel/analytics/server";

type AllowedPropertyValues = string | number | boolean | null | undefined;

/**
 * Track a custom analytics event from the server.
 * 
 * @param eventName - The name of the event to track
 * @param properties - Optional properties to attach to the event
 * @param headers - Optional headers object (e.g., from Express request)
 * 
 * @example
 * ```typescript
 * // Track a feature request submission
 * await trackEvent("feature_request_submitted", {
 *   feature: "dark_mode",
 *   user_type: "anonymous"
 * }, req.headers);
 * ```
 */
export async function trackEvent(
  eventName: string,
  properties?: Record<string, AllowedPropertyValues>,
  headers?: Record<string, string | string[] | undefined>
): Promise<void> {
  try {
    await track(eventName, properties, { headers });
  } catch (error) {
    // Log the error but don't fail the request
    // Analytics tracking should not break the API functionality
    console.error("Failed to track analytics event:", error);
  }
}
