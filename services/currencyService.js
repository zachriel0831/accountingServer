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

    crawlCurrency: async (param, callback) => {

        const steamUrl = process.env.CURRENCY_SITE;

        const html = await fethHtml(steamUrl);
        const $ = cheerio.load(html);

        const spot_Rate = $('.rate-content-sight.text-right.print_hide');
        const cash_Rate = $('.rate-content-cash.text-right.print_hide')

        const currency_type = $("div[class='hidden-phone print_show']");
        let currency_type_box = [];
        _.each(currency_type, (v, k) => {
            // console.log(v.firstChild.data.trim());
            let val = v.firstChild.data.trim();
            currency_type_box.push(val);
        })

        let spot_Rate_buying_selling_box = [];
        let i = 0;
        let spot_Rate_box = [];
        _.each(spot_Rate, (v, k) => {
            let val = v.firstChild.data.trim();
            spot_Rate_buying_selling_box.push(val);
            i++;

            if (i % 2 === 0) {
                spot_Rate_box.push(spot_Rate_buying_selling_box);
                spot_Rate_buying_selling_box = [];
                i = 0;
            }
        });

        let cash_Rate_buying_selling_box = [];
        let j = 0;
        let cash_Rate_box = [];

        _.each(cash_Rate, (v, k) => {
            let val = v.firstChild.data.trim();
            cash_Rate_buying_selling_box.push(val);
            j++;

            if (j % 2 === 0) {
                cash_Rate_box.push(cash_Rate_buying_selling_box);
                cash_Rate_buying_selling_box = [];
                j = 0;
            }
        })

        let result = [];

        _.each(currency_type_box, (v, k) => {
            let data = {};

            data.currency_type = v;
            data.currency_spot_rate = spot_Rate_box[k];
            data.currency_cash_rate = cash_Rate_box[k];

            result.push(data);
        });

        callback('',result);
    },
}