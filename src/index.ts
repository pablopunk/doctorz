import child_process from "child_process";
import { sendEmail } from "./email";

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;
const DEFAULT_INTERVAL_SEC = 15 * 60; // 15 minutes
const INTERVAL = parseInt(
  process.env.INTERVAL || DEFAULT_INTERVAL_SEC.toString(),
);

const outputMeansDegraded = (output: string) => output.includes("DEGRADED");

if (!EMAIL_TO || !EMAIL_FROM) {
  console.error("You need to specify EMAIL_TO and EMAIL_FROM env vars");
}

function checkZpool() {
  console.log("Checking zpool status...");
  child_process.exec("zpool status", (error, stdout, stderr) => {
    stdout && console.log(stdout);
    stderr && console.error(stderr);

    if (error || stderr) {
      console.error(`exec error: ${error}`);
      return;
    }

    if (outputMeansDegraded(stdout)) {
      console.log("DEGRADED. Sending email...");
      sendEmail(
        EMAIL_FROM!,
        EMAIL_TO!,
        "ZFS pool status",
        `
<h1>ZFS pool is degraded</h1>
<h2>Fix it ASAP</h2>
<h3>Full output below</h3>

<code>
${stdout}
</code>
`,
      );
      setInterval(checkZpool, 12 * 60 * 1000); // check 12 hours later
    } else {
      console.log("OK");
      setInterval(checkZpool, INTERVAL * 1000); // check again in X minutes
    }
  });
}

checkZpool();
