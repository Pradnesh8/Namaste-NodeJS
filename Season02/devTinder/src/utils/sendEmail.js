const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, email_subject, email_body) => {
    return new SendEmailCommand({
        Destination: {
            CcAddresses: [],
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<h1>${email_body}</h1>`,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `${email_body}`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `${email_subject}`,
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [],
    });
};

const run = async (email_subject, email_body) => {
    const sendEmailCommand = createSendEmailCommand(
        "pradneshkhedekar8@gmail.com",
        "support@devbuddy.live",
        email_subject,
        email_body
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof Error && caught.name === "MessageRejected") {
            const messageRejectedError = caught;
            return messageRejectedError;
        }
        throw caught;
    }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };