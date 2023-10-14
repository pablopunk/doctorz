import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(
  from: string,
  to: string,
  subject: string,
  html: string,
) {
  const mailOptions = {
    to,
    from,
    subject,
    html,
  };

  try {
    return await sendgrid.send(mailOptions);
  } catch (err) {
    console.error(err);
  }
}

export async function sendDegradedEmail(
  from: string,
  to: string,
  stdout: string,
) {
  const subject = "ZFS pool is degraded";
  const html = `
<h1>ZFS pool is degraded</h1>
<h2>Fix it ASAP</h2>
<h3>Full output below</h3>

<code>
${stdout}
</code>
`;

  return await sendEmail(from, to, subject, html);
}

export async function sendFixedEmail(from: string, to: string, stdout: string) {
  const subject = "ZFS pool is fixed";
  const html = `
<h1>ZFS pool is fixed</h1>
<h2>Good job!</h2>
<h3>Full output below</h3>

<code>
${stdout}
</code>
`;

  return await sendEmail(from, to, subject, html);
}
