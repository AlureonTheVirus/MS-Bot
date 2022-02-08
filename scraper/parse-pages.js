const cheerio = require('cheerio'); // html parser

module.exports = async function pages(mainurl, html_main, debugbool) {
    // begin parsing
    if (debugbool) console.log("loading html to cheerio...");
    let $ = cheerio.load(html_main); // move fetched html into cheerio api for parsing

    // grab the url to the last page for this discussion
    let lastpage; // grabs the link to the last page of the discussion (because scraping only handles the curent page)
    $('nav').find('a').each(function(index, element) {
        if ($(element).attr('islast') === "true") {
            lastpage = $(element).attr('href'); // grab the link stored in the htrf attribute
            if (debugbool) console.log("got last page");
        }
    });
    if(lastpage == null) lastpage = mainurl;

    let lastpgnumber = lastpage.charAt(lastpage.length - 1);
    if (debugbool) console.log('last page #: ' + lastpgnumber);
    let baseurl = lastpage.slice(0, lastpage.length - 1);
    if (debugbool) console.log('baseurl: ' + baseurl);
    var allpages = [];
    for (let i = 0; i <= lastpgnumber; i++) {
        var workingurl = baseurl.concat(i);
        if (debugbool) console.log('storing url: ' + workingurl);
        allpages.push(workingurl);
    }
    if (debugbool) console.log('all pages for this discussion: \n' + workingurl);
    return allpages;
}
