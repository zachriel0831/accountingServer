const cheerio = require("cheerio");
const axios = require("axios").default;
const _ = require('lodash');

const fethHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(
            `ERROR: An error occurred while trying to fetch the URL: ${url}`
        );
    }
};

module.exports = {
    crawlStocks: async (param, callback) => {
        try {

            const steamUrl = process.env.STOCKS_SITE;
            // const stockCode = param.code;
            const stockCode = param.stockCode;

            const html = await fethHtml(steamUrl + stockCode);
            const $ = cheerio.load(html);

            const realTimePrice = $('.jsx-2941083017 .info-lp span').text();

            callback('', realTimePrice);
        } catch {
            console.error(
                `ERROR: An error occurred while trying to crawlStocks`
            );
            callback('error', 0);
        }
    },

}