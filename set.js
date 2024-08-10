const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5sVzVvdi96OVVIV2FLOTM5Sjc5WUtZVThHd1BHNWRnWnQwODRkSXdtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0FhZUxES0pyMkRnZ0VKRTczTmN0Q0RpeEdFeURnNXptdjZrMGdXekZnQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQ25lNUVUSlFQZktqc1pHUGJsY2JkaldBMG1JZnhrVHZEWnBZb2lsMFhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlaW1lQ2RtWFpZdUtzMGR5V1Z6cUptVldmeHlZUHRYYkNFUkRpZmJrbzBrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1QZVRRU0t2RUNQdTcydnl4M2taaGs2cDRnRzlCMUh6enpOVDROMWpGRWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllxMlhnNzN3SzFiMTd4REUwV1VSVjZSTzhxK2JOS0RHTW40RXBaTnRpME09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZRZlROMnI2dzBORGFVcGNsTUZ4eUZnR2RFeDJwMkNGd3RYTExLS1RIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXh6WkNtWHhNVHhKd0F5d1pUdVB0SXplamVEZkdLc2tURDRFcWZrZmZIcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM4cG9hak1IQVNPZitZL1lYUGZvT0tzVlNGbHVoV09kUFZpalJtMllNWG9LSzVSMWFTSVlTSjFGSlRVRXFIbVRnQm1TMlFkWnZ5MFRzMllTS2QwUkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiJKc3c5M1RUNExSM3NZaGIxeTlldEk4Wmt1UFRNUTNXbjRyRVN0aHUxeUprPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1OTc5OTk5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NkM0QURBODk2NDg3NDIwQjVBRUMwQkQ4RThFRTFFOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzMjgxMDU3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhU2pRUFV1OFJQU2lma2FFTjdLd3B3IiwicGhvbmVJZCI6IjNkMzJiMWY3LWNlZjctNDllNS04MzhjLTAzNjQ5ZjEyNGVlZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQlcyNmNGSlBTdzJVRUtxRTQrQUpmV0lTQlU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWFlZDZxRVJkZFVlb2NKd0FGeVBOQmtFT3c0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZYWDJUNEVYIiwibWUiOnsiaWQiOiIyNTQ3NTk3OTk5OTU6NjNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ055Z2dwb0dFSS9kM0xVR0dCZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldzL2xKaWFKbm1SY3Jqc3F3RXRMcHQ5SDdTMGo0RVNnekxGejFUY2YyaTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFvNzZJVk9WWXdxd0ZyNXMxVENsWVp3dnU1cEZGWndHaXBQYTRQLzIzSEprTCt1RXBzSXd0YTRYQW9zTG80SFBkcGljUUFpN0p5YmM2Z0NkaGZMTkJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJmdnc3YTdTVDR6VVhJSmpsYmFGbkxRckdjWlZuMGhFWm1OcUUwU1czTWttUzZ4K1YvNWdOL2lrQTVGdmZKdGVUcmZhNEsyRG14eExxTHhvU2Q0N3JEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1OTc5OTk5NTo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWclA1U1ltaVo1a1hLNDdLc0JMUzZiZlIrMHRJK0JFb015eGM5VTNIOW92In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMjgxMDUyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUk3bSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KADINYA",
    NUMERO_OWNER : process.env.OWNER_NUM || "254759799995",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
