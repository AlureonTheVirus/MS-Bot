const cheerio = require('cheerio'); // html parser

// returns an array of the links to the top 5 last active discussions in the group
module.exports = async function lastpage(html_main, debugbool) {
    // begin parsing
    if (debugbool) console.log("loading html to cheerio...");
    let $ = cheerio.load(html_main); // move fetched html into cheerio api for parsing

    let name; // grabs top 5 discussions from the sidebar of the discussion
    $('main').find('div > div > h2', '._2Br8U Jojqb _1zBkq').each(function(index, element) { // runs for all a elements with 3 parent divs
        if (debugbool) console.log("adding name of discussion...");
        name = $(element).text() // grab the link stored in the htrf attribute
    });

    return name;

}