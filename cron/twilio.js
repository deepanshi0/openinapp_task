const dotenv = require('dotenv');

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const makeVoiceCall = async (toNumber) => {
  try {
    const call = await client.calls.create({
      to: toNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: "http://demo.twilio.com/docs/voice.xml",
    });
    console.log(`Call initiated to ${toNumber}: ${call.sid}`);
    return call.sid;
  } catch (error) {
    console.error(`Error initiating call to ${toNumber}:`, error);
    throw error;
  }
};

module.exports = { makeVoiceCall };

