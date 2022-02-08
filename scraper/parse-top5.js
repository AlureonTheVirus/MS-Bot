const cheerio = require('cheerio'); // html parser

// returns an array of the links to the top 5 last active discussions in the group
module.exports = async function lastpage(html_main, debugbool) {
    // begin parsing
    if (debugbool) console.log("loading html to cheerio...");
    let $ = cheerio.load(html_main); // move fetched html into cheerio api for parsing

    let top5discussions = []; // grabs top 5 discussions from the sidebar of the discussion
    if (debugbool) console.log("made variable, looking for attributes...");
    $('div').find('div > div > div > a').each(function(index, element) { // runs for all a elements with 3 parent divs
        if (debugbool) console.log("adding attribute to variable...");
        top5discussions.push($(element).attr('href')); // grab link stored in the htrf attribute
    });
    top5discussions.shift(); // pop unneeded text out of array
    top5discussions.shift(); // ...ditto

    return top5discussions;

}