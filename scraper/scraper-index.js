const fs = require('fs');
const fetch = require('./fetcher.js');
const pages = require('./parse-pages.js');
const top5 = require('./parse-top5.js');
const name = require('./parse-name.js');
const comments = require('./parse-comments.js');
const objectify = require('./objectify.js');



module.exports = async function main(mainurl, cachebool, debugbool) {

    var html_main; // first page of discussion
    var discussionname; // name of discussion
    var discussionpages = []; // array of all urls part of a discussion [pg1, pg2, pg3...]
    var discussionpages_html = []; // full html from every page of a discussion (including page 1)
    var discussioncomments = []; // 2d array, [page#][commentcontent]
    var topdiscussions = []; // array of top 5 discussions displayed on the side panel on MS

    // call functions here

    html_main = await fetch(mainurl, html_main, debugbool);
    discussionname = await name(html_main, debugbool);
    topdiscussions = await top5(html_main, debugbool);
    discussionpages = await pages(html_main, debugbool);
    var id = discussionpages[discussionpages.length - 1].split('/').pop().split('?')[0];

    for (let i = 0; i < discussionpages.length; i++) {
        var dummyhtml;
        discussionpages_html.push(await fetch(discussionpages[i], dummyhtml, debugbool));
    }

    let comments_thispage = [];
    for (let i = 0; i < discussionpages_html.length; i++) {
        comments_thispage = await comments(discussionpages_html[i]);
        for (let q = 0; q < comments_thispage.length; q++) comments_thispage[q].push(i + 1);
        discussioncomments = discussioncomments.concat(comments_thispage);
    }

    if (cachebool) {
        var discussion = await objectify(discussioncomments, id, discussionname, topdiscussions, mainurl, debugbool);
        fs.writeFile('cache.json', JSON.stringify(discussion), (err) => {
            if (err) {
                throw err;
            }
        });
    }
    return discussion;
}

