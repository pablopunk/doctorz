import child_process from "child_process";
import { sendDegradedEmail, sendFixedEmail } from "./email";

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

let wasDegraded = false;

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
      if (wasDegraded) {
        return; // ignore, already sent email
      }

      wasDegraded = true;

      console.log("DEGRADED. Sending email...");
      sendDegradedEmail(EMAIL_FROM!, EMAIL_TO!, stdout);
      return;
    }

    if (wasDegraded) {
      console.log("FIXED. Sending email...");
      sendFixedEmail(EMAIL_FROM!, EMAIL_TO!, stdout);
    } else {
      console.log("OK");
    }

    wasDegraded = false;
  });
}

checkZpool();
setInterval(checkZpool, INTERVAL * 1000);
