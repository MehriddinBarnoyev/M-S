/**
 * ─────────────────────────────────────────────────────────────
 * Geolocation & Reverse-Geocoding Service
 *
 * Provides dual-layer location intelligence:
 * 1. IP-based geolocation (instant, silent, 100% reliable fallback)
 * 2. High-precision GPS geolocation (pinpoint meter accuracy via browser API)
 * 3. Human-readable street reverse-geocoding (OpenStreetMap / BigDataCloud)
 * ─────────────────────────────────────────────────────────────
 */

export interface IpLocation {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  postalCode?: string;
  isp?: string;
  org?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  mapUrl?: string;
}

export interface GpsLocation {
  latitude: number;
  longitude: number;
  accuracy: number; // in meters
  altitude?: number | null;
  speed?: number | null;
  heading?: number | null;
  address?: string;
  googleMapUrl: string;
  yandexMapUrl: string;
  appleMapUrl: string;
}

/** Helper to fetch with timeout */
async function fetchWithTimeout(url: string, timeoutMs = 3000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Attempts to retrieve IP location using multiple redundant client-side providers.
 */
export async function fetchIpLocation(): Promise<IpLocation | null> {
  // Provider 1: ipapi.co
  try {
    const res = await fetchWithTimeout("https://ipapi.co/json/", 3000);
    if (res.ok) {
      const d = (await res.json()) as {
        ip?: string;
        city?: string;
        region?: string;
        country_name?: string;
        country_code?: string;
        postal?: string;
        org?: string;
        latitude?: number;
        longitude?: number;
        timezone?: string;
      };
      if (d.ip) {
        return {
          ip: d.ip,
          city: d.city,
          region: d.region,
          country: d.country_name,
          countryCode: d.country_code,
          postalCode: d.postal,
          isp: d.org,
          org: d.org,
          latitude: d.latitude,
          longitude: d.longitude,
          timezone: d.timezone,
          mapUrl:
            d.latitude && d.longitude
              ? `https://maps.google.com/?q=${d.latitude},${d.longitude}`
              : undefined,
        };
      }
    }
  } catch {
    // Fall through
  }

  // Provider 3: ip-api.com
  try {
    const res = await fetchWithTimeout(
      "https://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query",
      3000
    );
    if (res.ok) {
      const d = (await res.json()) as {
        status?: string;
        query?: string;
        country?: string;
        countryCode?: string;
        regionName?: string;
        city?: string;
        zip?: string;
        lat?: number;
        lon?: number;
        isp?: string;
        org?: string;
        timezone?: string;
      };
      if (d.status === "success" && d.query) {
        return {
          ip: d.query,
          city: d.city,
          region: d.regionName,
          country: d.country,
          countryCode: d.countryCode,
          postalCode: d.zip,
          isp: d.isp,
          org: d.org,
          latitude: d.lat,
          longitude: d.lon,
          timezone: d.timezone,
          mapUrl:
            d.lat && d.lon
              ? `https://maps.google.com/?q=${d.lat},${d.lon}`
              : undefined,
        };
      }
    }
  } catch {
    // Fall through
  }

  // Provider 4: ipwho.is
  try {
    const res = await fetchWithTimeout("https://ipwho.is/", 3000);
    if (res.ok) {
      const d = (await res.json()) as {
        success?: boolean;
        ip?: string;
        country?: string;
        country_code?: string;
        region?: string;
        city?: string;
        postal?: string;
        latitude?: number;
        longitude?: number;
        connection?: { isp?: string; org?: string };
        timezone?: { id?: string };
      };
      if (d.success && d.ip) {
        return {
          ip: d.ip,
          city: d.city,
          region: d.region,
          country: d.country,
          countryCode: d.country_code,
          postalCode: d.postal,
          isp: d.connection?.isp,
          org: d.connection?.org,
          latitude: d.latitude,
          longitude: d.longitude,
          timezone: d.timezone?.id,
          mapUrl:
            d.latitude && d.longitude
              ? `https://maps.google.com/?q=${d.latitude},${d.longitude}`
              : undefined,
        };
      }
    }
  } catch {
    // All IP providers failed
  }

  return null;
}

/**
 * Reverse-geocodes exact coordinates into street / quarter / city using OpenStreetMap Nominatim.
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<string | undefined> {
  // Attempt 1: OpenStreetMap Nominatim
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
    const res = await fetchWithTimeout(url, 3500);
    if (res.ok) {
      const data = (await res.json()) as {
        display_name?: string;
        address?: {
          road?: string;
          house_number?: string;
          neighbourhood?: string;
          suburb?: string;
          city_district?: string;
          city?: string;
          town?: string;
          village?: string;
          state?: string;
          country?: string;
        };
      };

      if (data.address) {
        const a = data.address;
        const street = [a.road, a.house_number].filter(Boolean).join(" ");
        const locality = a.neighbourhood || a.suburb || a.city_district || "";
        const city = a.city || a.town || a.village || a.state || "";
        const country = a.country || "";

        const parts = [street, locality, city, country].filter((p) => p && p.trim().length > 0);
        if (parts.length > 0) {
          return parts.join(", ");
        }
      }

      if (data.display_name) {
        return data.display_name;
      }
    }
  } catch {
    // Fallback to BigDataCloud
  }

  // Attempt 2: BigDataCloud Reverse Geocoding
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=uz`;
    const res = await fetchWithTimeout(url, 3000);
    if (res.ok) {
      const d = (await res.json()) as {
        locality?: string;
        city?: string;
        principalSubdivision?: string;
        countryName?: string;
      };
      const parts = [d.locality, d.city, d.principalSubdivision, d.countryName].filter(Boolean);
      if (parts.length > 0) {
        return parts.join(", ");
      }
    }
  } catch {
    // Geocode failed
  }

  return undefined;
}

/**
 * Requests high-accuracy GPS coordinates via browser Geolocation API.
 * Returns null if denied, timed out, or unsupported.
 */
export async function requestGpsLocation(timeoutMs = 12000): Promise<GpsLocation | null> {
  if (typeof window === "undefined" || !navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    let settled = false;

    const finalize = (loc: GpsLocation | null) => {
      if (settled) return;
      settled = true;
      resolve(loc);
    };

    const timer = setTimeout(() => {
      finalize(null);
    }, timeoutMs);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timer);
        const { latitude, longitude, accuracy, altitude, speed, heading } = pos.coords;

        // Perform reverse geocoding asynchronously
        let address: string | undefined;
        try {
          address = await reverseGeocode(latitude, longitude);
        } catch {
          // Keep raw coordinates if reverse geocode fails
        }

        const googleMapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        const yandexMapUrl = `https://yandex.uz/maps/?pt=${longitude},${latitude}&z=18&l=map`;
        const appleMapUrl = `https://maps.apple.com/?ll=${latitude},${longitude}&q=${latitude},${longitude}`;

        finalize({
          latitude,
          longitude,
          accuracy: Math.round(accuracy),
          altitude,
          speed,
          heading,
          address,
          googleMapUrl,
          yandexMapUrl,
          appleMapUrl,
        });
      },
      () => {
        clearTimeout(timer);
        finalize(null);
      },
      {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 0,
      }
    );
  });
}
