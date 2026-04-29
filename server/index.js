const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const PORT = process.env.MAIL_SERVER_PORT || process.env.PORT || 5000;
const OWNER_NAME = "PAVAN BUSANAMONi";
const OWNER_EMAIL =
  process.env.CONTACT_RECEIVER_EMAIL || "pavan.busanamoni@gmail.com";
const MAIL_USER = process.env.MAIL_USER || "personal.portfolio.pavan@gmail.com";
const MAIL_APP_PASSWORD = process.env.MAIL_APP_PASSWORD;
const CLIENT_ORIGINS = [
  ...(process.env.CLIENT_ORIGIN || "").split(","),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  return (
    !origin ||
    CLIENT_ORIGINS.includes(origin) ||
    /^http:\/\/(?:localhost|127\.0\.0\.1|\d{1,3}(?:\.\d{1,3}){3}):3000$/.test(
      origin
    )
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_APP_PASSWORD,
  },
});

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function detailRow(label, value, highlight = false) {
  return `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #e6edf5;color:#64748b;font-weight:700;width:190px;">${label}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #e6edf5;color:#0f172a;${
        highlight ? "font-weight:800;background:#ecfeff;" : ""
      }">${escapeHtml(value || "Not provided")}</td>
    </tr>
  `;
}

function getPriorityTheme(priority = "") {
  const normalized = priority.toLowerCase();

  if (normalized.includes("high")) {
    return {
      label: "Immediate attention",
      accent: "#e11d48",
      bg: "#fff1f2",
      border: "#fb7185",
      text: "#9f1239",
    };
  }

  if (normalized.includes("quick")) {
    return {
      label: "Quick response",
      accent: "#0284c7",
      bg: "#f0f9ff",
      border: "#38bdf8",
      text: "#075985",
    };
  }

  if (normalized.includes("future")) {
    return {
      label: "Future opportunity",
      accent: "#7c3aed",
      bg: "#f5f3ff",
      border: "#a78bfa",
      text: "#5b21b6",
    };
  }

  return {
    label: "Normal follow-up",
    accent: "#d97706",
    bg: "#fffbeb",
    border: "#fbbf24",
    text: "#92400e",
  };
}

function getNeedTheme(need = "") {
  const normalized = need.toLowerCase();

  if (normalized.includes("hiring") || normalized.includes("internship")) {
    return {
      label: "Career / Hiring",
      accent: "#059669",
      bg: "#ecfdf5",
      border: "#34d399",
      text: "#065f46",
    };
  }

  if (normalized.includes("freelance")) {
    return {
      label: "Paid project",
      accent: "#9333ea",
      bg: "#faf5ff",
      border: "#c084fc",
      text: "#6b21a8",
    };
  }

  if (normalized.includes("collaboration")) {
    return {
      label: "Collaboration",
      accent: "#0891b2",
      bg: "#ecfeff",
      border: "#22d3ee",
      text: "#155e75",
    };
  }

  if (normalized.includes("technical")) {
    return {
      label: "Technical discussion",
      accent: "#2563eb",
      bg: "#eff6ff",
      border: "#60a5fa",
      text: "#1e40af",
    };
  }

  return {
    label: "General message",
    accent: "#475569",
    bg: "#f8fafc",
    border: "#94a3b8",
    text: "#334155",
  };
}

function badge(value, theme) {
  return `
    <span style="display:inline-block;padding:7px 11px;border-radius:999px;background:${theme.bg};border:1px solid ${theme.border};color:${theme.text};font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:.03em;">
      ${escapeHtml(value)}
    </span>
  `;
}

function highlightedRow(label, value, theme, note) {
  return `
    <tr>
      <td style="padding:14px;border-bottom:1px solid #e6edf5;color:#64748b;font-weight:800;width:190px;">${label}</td>
      <td style="padding:14px;border-bottom:1px solid #e6edf5;background:${theme.bg};border-left:5px solid ${theme.accent};color:${theme.text};">
        <div style="font-size:16px;font-weight:950;">${escapeHtml(
          value || "Not provided"
        )}</div>
        <div style="margin-top:4px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:${theme.text};opacity:.82;">${escapeHtml(
          note
        )}</div>
      </td>
    </tr>
  `;
}

function notificationTemplate(data) {
  const priorityTheme = getPriorityTheme(data.priority);
  const needTheme = getNeedTheme(data.need);

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f8fb;padding:28px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #dbe6f0;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0f172a,#164e63);padding:26px 28px;color:#ffffff;">
          <p style="margin:0 0 10px;color:#67e8f9;font-weight:800;text-transform:uppercase;letter-spacing:.04em;">Portfolio Contact Request</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">${escapeHtml(
            data.priority
          )} from ${escapeHtml(data.name)}</h1>
          <p style="margin:12px 0 0;color:#d1fae5;font-weight:700;">${escapeHtml(
            data.need
          )} • Reply by ${escapeHtml(data.reply)}</p>
        </div>
        <div style="padding:18px 28px 6px;background:#ffffff;">
          <table style="width:100%;border-collapse:separate;border-spacing:0 10px;">
            <tr>
              <td style="width:50%;padding:0 8px 0 0;">
                <div style="border:1px solid ${needTheme.border};border-left:7px solid ${needTheme.accent};border-radius:12px;background:${needTheme.bg};padding:16px;">
                  <div style="margin-bottom:8px;color:${needTheme.text};font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Contact Need</div>
                  <div style="color:${needTheme.text};font-size:20px;font-weight:950;line-height:1.25;">${escapeHtml(
                    data.need
                  )}</div>
                  <div style="margin-top:8px;">${badge(
                    needTheme.label,
                    needTheme
                  )}</div>
                </div>
              </td>
              <td style="width:50%;padding:0 0 0 8px;">
                <div style="border:1px solid ${priorityTheme.border};border-left:7px solid ${priorityTheme.accent};border-radius:12px;background:${priorityTheme.bg};padding:16px;">
                  <div style="margin-bottom:8px;color:${priorityTheme.text};font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Priority</div>
                  <div style="color:${priorityTheme.text};font-size:20px;font-weight:950;line-height:1.25;">${escapeHtml(
                    data.priority
                  )}</div>
                  <div style="margin-top:8px;">${badge(
                    priorityTheme.label,
                    priorityTheme
                  )}</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          ${detailRow("Receiver", OWNER_NAME, true)}
          ${detailRow("Receiver Mail", OWNER_EMAIL, true)}
          ${detailRow("Sender Name", data.name)}
          ${detailRow("Sender Email", data.email)}
          ${detailRow("Phone / WhatsApp", data.phone)}
          ${detailRow("Company / College", data.company)}
          ${highlightedRow(
            "Message Type",
            data.need,
            needTheme,
            needTheme.label
          )}
          ${highlightedRow(
            "Priority Level",
            data.priority,
            priorityTheme,
            priorityTheme.label
          )}
          ${highlightedRow(
            "Preferred Reply",
            data.reply,
            {
              accent: "#14b8a6",
              bg: "#f0fdfa",
              border: "#5eead4",
              text: "#0f766e",
            },
            "Best contact channel"
          )}
        </table>
        <div style="padding:24px 28px 28px;background:#ffffff;">
          <div style="margin-bottom:12px;">
            <span style="display:inline-block;color:${priorityTheme.text};background:${priorityTheme.bg};border:1px solid ${priorityTheme.border};border-radius:999px;padding:7px 12px;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Main message to read first</span>
          </div>
          <h2 style="margin:0 0 12px;color:#0f172a;font-size:22px;line-height:1.25;">${escapeHtml(
            data.need
          )} request details</h2>
          <div style="white-space:pre-wrap;line-height:1.75;color:#111827;background:linear-gradient(135deg,${priorityTheme.bg},#ffffff);border:2px solid ${priorityTheme.border};border-left:10px solid ${priorityTheme.accent};border-radius:14px;padding:18px 20px;font-size:16px;font-weight:700;box-shadow:0 12px 30px rgba(15,23,42,.08);">${escapeHtml(
            data.message
          )}</div>
        </div>
      </div>
    </div>
  `;
}

function autoReplyTemplate(data) {
  const needTheme = getNeedTheme(data.need);
  const priorityTheme = getPriorityTheme(data.priority);
  const replyTheme = {
    accent: "#14b8a6",
    bg: "#f0fdfa",
    border: "#5eead4",
    text: "#0f766e",
  };

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f8fb;padding:28px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe6f0;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0f172a,#0f766e);padding:26px 28px;color:#ffffff;">
          <p style="margin:0;color:#99f6e4;font-weight:900;text-transform:uppercase;letter-spacing:.05em;">${escapeHtml(
            OWNER_NAME
          )} Portfolio</p>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Thank you, ${escapeHtml(
            data.name
          )}</h1>
          <p style="margin:12px 0 0;color:#d1fae5;font-weight:700;">Your ${escapeHtml(
            data.need
          )} request is safely in my inbox.</p>
        </div>
        <div style="padding:26px 28px;color:#1f2937;line-height:1.7;font-size:15px;">
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>Thank you for contacting me through my portfolio.</p>
          <p><strong>Please be patient, I will definitely reach you soon.</strong></p>

          <table style="width:100%;border-collapse:separate;border-spacing:0 10px;margin:18px 0 4px;">
            <tr>
              <td style="padding:0;">
                <div style="border:1px solid ${needTheme.border};border-left:7px solid ${needTheme.accent};border-radius:12px;background:${needTheme.bg};padding:15px 16px;">
                  <div style="color:${needTheme.text};font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Message Type</div>
                  <div style="margin-top:5px;color:${needTheme.text};font-size:20px;font-weight:950;line-height:1.25;">${escapeHtml(
                    data.need
                  )}</div>
                  <div style="margin-top:8px;">${badge(
                    needTheme.label,
                    needTheme
                  )}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0;">
                <table style="width:100%;border-collapse:separate;border-spacing:0;">
                  <tr>
                    <td style="width:50%;padding:0 6px 0 0;">
                      <div style="border:1px solid ${priorityTheme.border};border-left:6px solid ${priorityTheme.accent};border-radius:12px;background:${priorityTheme.bg};padding:14px;">
                        <div style="color:${priorityTheme.text};font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Priority</div>
                        <div style="margin-top:5px;color:${priorityTheme.text};font-size:16px;font-weight:950;">${escapeHtml(
                          data.priority
                        )}</div>
                      </div>
                    </td>
                    <td style="width:50%;padding:0 0 0 6px;">
                      <div style="border:1px solid ${replyTheme.border};border-left:6px solid ${replyTheme.accent};border-radius:12px;background:${replyTheme.bg};padding:14px;">
                        <div style="color:${replyTheme.text};font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Reply Via</div>
                        <div style="margin-top:5px;color:${replyTheme.text};font-size:16px;font-weight:950;">${escapeHtml(
                          data.reply
                        )}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="margin-top:18px;">I received your <strong>${escapeHtml(
            data.need
          )}</strong> message and will reply through <strong>${escapeHtml(
    data.reply
  )}</strong>.</p>

          <div style="margin-top:18px;padding:18px 20px;background:linear-gradient(135deg,${needTheme.bg},#ffffff);border:2px solid ${needTheme.border};border-left:10px solid ${needTheme.accent};border-radius:14px;box-shadow:0 12px 28px rgba(15,23,42,.07);">
            <div style="display:inline-block;margin-bottom:10px;padding:6px 10px;border-radius:999px;background:${needTheme.bg};border:1px solid ${needTheme.border};color:${needTheme.text};font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Your submitted message</div>
            <div style="white-space:pre-wrap;color:#111827;font-size:16px;font-weight:800;line-height:1.7;">${escapeHtml(
              data.message
            )}</div>
          </div>
          <p style="margin-top:22px;">Regards,<br /><strong>${escapeHtml(
            OWNER_NAME
          )}</strong></p>
        </div>
      </div>
    </div>
  `;
}

function notificationText(data) {
  return [
    "Portfolio Contact Request",
    "",
    `Receiver: ${OWNER_NAME} <${OWNER_EMAIL}>`,
    `Sender Name: ${data.name}`,
    `Sender Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || "Not provided"}`,
    `Company / College: ${data.company || "Not provided"}`,
    `Contact Need: ${data.need}`,
    `Priority: ${data.priority}`,
    `Preferred Reply: ${data.reply}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function autoReplyText(data) {
  return [
    `Hi ${data.name},`,
    "",
    "Thank you for contacting me through my portfolio.",
    "Please be patient, I will definitely reach you soon.",
    "",
    `Message type: ${data.need}`,
    `Priority: ${data.priority}`,
    `Preferred reply: ${data.reply}`,
    "",
    `I received your ${data.need} message and will reply through ${data.reply}.`,
    "",
    "Your message:",
    data.message,
    "",
    "Regards,",
    OWNER_NAME,
  ].join("\n");
}

function validateContact(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required.");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("A valid email is required.");
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.push("Message is required.");
  }

  return errors;
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mailConfigured: Boolean(MAIL_USER && MAIL_APP_PASSWORD && OWNER_EMAIL),
  });
});

app.post("/api/contact", async (req, res) => {
  const data = {
    name: req.body.name?.trim(),
    email: req.body.email?.trim(),
    phone: req.body.phone?.trim(),
    company: req.body.company?.trim(),
    need: req.body.need?.trim() || "Portfolio contact",
    priority: req.body.priority?.trim() || "Normal priority",
    reply: req.body.reply?.trim() || "Email",
    message: req.body.message?.trim(),
  };

  const errors = validateContact(data);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(" ") });
  }

  if (!MAIL_APP_PASSWORD) {
    return res.status(500).json({
      message:
        "Mail server is missing MAIL_APP_PASSWORD. Add your Gmail app password to the ignored .env file and restart the server.",
    });
  }

  try {
    const subject = `Portfolio Contact: ${data.priority} - ${data.need} from ${data.name}`;

    await transporter.sendMail({
      from: `"${OWNER_NAME} Portfolio" <${MAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject,
      text: notificationText(data),
      html: notificationTemplate(data),
    });

    await transporter.sendMail({
      from: `"${OWNER_NAME}" <${MAIL_USER}>`,
      to: data.email,
      subject: `Thank you for contacting ${OWNER_NAME}`,
      text: autoReplyText(data),
      html: autoReplyTemplate(data),
    });

    res.json({
      message:
        "Message sent successfully. I received your contact request, and an auto-response was sent to your email.",
    });
  } catch (error) {
    console.error("Contact mail failed:", error);
    res.status(500).json({
      message:
        "Mail could not be sent right now. Check the server terminal for the Nodemailer error, then try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact mail server running on http://localhost:${PORT}`);
});
