import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(
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
