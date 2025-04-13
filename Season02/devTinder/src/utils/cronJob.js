const cron = require('node-cron');
const { ConnectionRequest } = require('../models/connectionRequest')
const { subDays, startOfDay, endOfDay } = require('date-fns');
const sendEmail = require("./sendEmail");

cron.schedule('0 8 * * *', async () => {
    const yesterdayDate = subDays(new Date(), 1);
    const yesterdayStartTime = startOfDay(yesterdayDate);
    const yesterdayEndTime = endOfDay(yesterdayDate);

    const res = await ConnectionRequest.find({
        status: 'interested',
        createdAt: {
            $gte: yesterdayStartTime,
            $lt: yesterdayEndTime
        }
    })
        .populate("fromUserId")
        .populate("toUserId")

    const listOfEmailIds = [...new Set(res.map(req => req.toUserId.emailId))];
    console.log('list of emails: ', listOfEmailIds)
    // send the email to users who have got requests on previous day
    for (const email of listOfEmailIds) {
        try {
            const res = await sendEmail.run(
                "You have got Connection request for " + email,
                "You have received a connection requests, Please login to devbuddy.live and accept/reject the requests."
            );
            console.log("RES:: ", res);
        } catch (error) {
            console.log("Error sending a Cron Email.")
        }
    };
});
