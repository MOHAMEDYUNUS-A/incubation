import nodemailer from "nodemailer";

/**
 * Interface for email transmission options
 */
export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Configure Nodemailer transport
 * Reads from SMTP environment variables:
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 * If not provided, falls back to mock simulation without throwing errors.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return null;
}

const DEFAULT_FROM =
  process.env.SMTP_FROM ||
  '"MASTeR Incubation Foundation" <noreply@masterincubation.org>';

/**
 * Send email helper with automatic fallback simulation
 */
export async function sendEmail(options: SendEmailOptions) {
  const transporter = getTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: DEFAULT_FROM,
        to: options.to,
        replyTo: options.replyTo || "contact@masterincubation.org",
        subject: options.subject,
        text: options.text || options.html.replace(/<[^>]+>/g, " "),
        html: options.html,
      });
      console.log(`[EMAIL DISPATCH SUCCESS] Sent email to ${options.to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId, simulated: false };
    } catch (err: any) {
      console.error(`[EMAIL DISPATCH ERROR] Failed to send email via SMTP:`, err);
      // Fallback to simulated delivery so applicant workflow is never disrupted
      return { success: true, simulated: true, error: err.message };
    }
  }

  // Simulated transmission in local dev or before SMTP env variables are configured
  console.log(`=======================================================`);
  console.log(`[MOCK EMAIL SIMULATION - CONFIGURE SMTP_HOST IN .ENV]`);
  console.log(`From:    ${DEFAULT_FROM}`);
  console.log(`To:      ${options.to}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Body:    ${options.text || options.html.slice(0, 150)}...`);
  console.log(`=======================================================`);

  return {
    success: true,
    simulated: true,
    messageId: `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  };
}

/**
 * Branded HTML Template for Incubation Application Receipt (No-Reply)
 */
export function getApplicationReceiptEmail(data: {
  applicationId: string;
  founderName: string;
  startupName: string;
  category: string;
  stage: string;
  submissionDate?: string;
}) {
  const refId = data.applicationId.startsWith("MIF-APP-")
    ? data.applicationId
    : `MIF-APP-${data.applicationId.replace(/^app-/, "").toUpperCase()}`;

  const formattedDate = data.submissionDate || new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Application Received — MASTeR Incubation Foundation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #091b34; padding: 28px 32px; text-align: left; border-bottom: 3px solid #ea580c;">
      <div style="color: #ea580c; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">
        StartupTN Pre-Incubation Centre · MAMCET
      </div>
      <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0; line-height: 1.3;">
        MASTeR Incubation Foundation
      </h1>
      <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">
        Technology Business Incubator · Section 8 Non-Profit
      </p>
    </div>

    <!-- Body Content -->
    <div style="padding: 32px;">
      <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; font-size: 11px; font-weight: 700; margin-bottom: 16px;">
        ✓ APPLICATION CONFIRMATION (NO-REPLY)
      </div>

      <h2 style="font-size: 18px; font-weight: 800; color: #091b34; margin: 0 0 12px 0;">
        Dear ${data.founderName},
      </h2>

      <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
        Thank you for submitting your incubation proposal for <strong>${data.startupName}</strong> to the MASTeR Incubation Foundation (MIF) at MAMCET Siruganur.
      </p>

      <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
        Your application has been logged into our centralized screening intake database and assigned the official tracking identifier below:
      </p>

      <!-- Reference ID Card -->
      <div style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
          Application Tracking Identifier
        </div>
        <div style="font-family: monospace; font-size: 20px; font-weight: 800; color: #091b34; letter-spacing: 0.05em;">
          ${refId}
        </div>
        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
          Submitted on ${formattedDate}
        </div>
      </div>

      <!-- Application Summary Grid -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 13px;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 40%; font-weight: 600;">Startup Venture</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${data.startupName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Category Track</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.category.replace(/_/g, " ")}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">TRL / Maturity Stage</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.stage.replace(/_/g, " ")}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #64748b; font-weight: 600;">Current Status</td>
          <td style="padding: 10px 12px; color: #2563eb; font-weight: 700;">SUBMITTED (Screening Pending)</td>
        </tr>
      </table>

      <!-- Next Steps Roadmap -->
      <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px;">
        <h3 style="font-size: 13px; font-weight: 800; color: #6b21a8; text-transform: uppercase; margin: 0 0 10px 0;">
          Incubation Evaluation Roadmap
        </h3>
        <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #4b5563;">
          <li style="margin-bottom: 6px;"><strong>Preliminary Screening:</strong> Our technical committee reviews technical feasibility, novelty, and commercial viability within <strong>3–5 business days</strong>.</li>
          <li style="margin-bottom: 6px;"><strong>Pitch Presentation:</strong> Shortlisted applicants will be invited for an in-person or hybrid pitch presentation before our Advisory Committee.</li>
          <li><strong>Induction & Grant Access:</strong> Selected startups receive access to MAMCET fabrication labs, mentor roster, and seed grants (TANSEED ₹10L / MSME Hackathon ₹15L).</li>
        </ol>
      </div>

      <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin-bottom: 20px;">
        You can check your live review status anytime on our website using your Application Identifier: <br />
        <a href="https://master-incubation.vercel.app/apply/status?id=${encodeURIComponent(refId)}" style="color: #ea580c; font-weight: 700; text-decoration: underline;">
          Track Application Live Status ↗
        </a>
      </p>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
        Need to update information or have urgent questions? Contact our Incubation Coordinator Dr. Hemalatha Balakrishnan at 
        <a href="mailto:hemalathabalakrishnan.ece@mamcet.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">hemalathabalakrishnan.ece@mamcet.com</a> 
        or call <span style="font-family: monospace; font-weight: 600;">+91 9361697702</span>.
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5;">
      <p style="margin: 0 0 4px 0;">
        <strong>MASTeR Incubation Foundation (MIF)</strong> · M.A.M. College of Engineering & Technology
      </p>
      <p style="margin: 0 0 6px 0;">
        Trichy - Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu – 621 105
      </p>
      <p style="margin: 0; color: #cbd5e1;">
        <em>This is an automated system email sent from a notification-only address. Please do not reply directly to this email.</em>
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

/**
 * Branded HTML Template for Contact Form Enquiry Receipt (No-Reply)
 */
export function getContactEnquiryReceiptEmail(data: {
  name: string;
  subject: string;
  message: string;
  referenceId: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Enquiry Received — MASTeR Incubation Foundation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #091b34; padding: 28px 32px; text-align: left; border-bottom: 3px solid #ea580c;">
      <div style="color: #ea580c; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">
        StartupTN Pre-Incubation Centre · MAMCET
      </div>
      <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0; line-height: 1.3;">
        MASTeR Incubation Foundation
      </h1>
      <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">
        Campus Desk & Operations Center
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 11px; font-weight: 700; margin-bottom: 16px;">
        ✓ INQUIRY LOGGED (NO-REPLY)
      </div>

      <h2 style="font-size: 18px; font-weight: 800; color: #091b34; margin: 0 0 12px 0;">
        Dear ${data.name},
      </h2>

      <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 18px;">
        Thank you for contacting the MASTeR Incubation Foundation (MIF) at MAMCET Siruganur. We have successfully received your enquiry regarding:
      </p>

      <div style="background-color: #f8fafc; border-left: 4px solid #ea580c; border-radius: 0 8px 8px 0; padding: 14px 18px; margin-bottom: 20px;">
        <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
          ${data.subject}
        </div>
        <div style="font-size: 12px; color: #475569; font-style: italic; line-height: 1.5;">
          "${data.message.length > 200 ? data.message.slice(0, 200) + '...' : data.message}"
        </div>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
        Our campus incubation management team is reviewing your message. We aim to respond to all institutional enquiries within <strong>24–48 business hours</strong>.
      </p>

      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px; font-size: 12px; color: #475569;">
        <strong>Reference Tracking:</strong> <span style="font-family: monospace; font-weight: 700; color: #091b34;">${data.referenceId}</span>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; line-height: 1.5;">
        For direct urgent coordination, feel free to call our desk line: <br />
        <strong>Manager Hotline:</strong> +91 9361697702 | <strong>Coordinator Hotline:</strong> +91 6381945574
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5;">
      <p style="margin: 0 0 4px 0;">
        <strong>MASTeR Incubation Foundation (MIF)</strong> · MAMCET Siruganur, Trichy
      </p>
      <p style="margin: 0; color: #cbd5e1;">
        <em>This is an automated system confirmation. Please do not reply directly to this noreply email.</em>
      </p>
    </div>

  </div>
</body>
</html>
  `;
}
