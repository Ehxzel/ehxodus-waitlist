import posthog from 'posthog-js'

export function initPostHog() {
  const key = import.meta.env.VITE_POSTHOG_KEY
  if (!key) return
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    person_profiles: 'identified_only',
  })
}

export function track(event: string, properties?: Record<string, unknown>) {
  try {
    posthog.capture(event, properties)
  } catch {
    // PostHog not initialised — fail silently
  }
}

export function identify(email: string, properties?: Record<string, unknown>) {
  try {
    posthog.identify(email, { email, ...properties })
  } catch {}
}
