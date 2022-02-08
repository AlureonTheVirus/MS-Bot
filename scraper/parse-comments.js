const cheerio = require('cheerio'); // html parser

module.exports = async function getcomments(html_main, debugbool) {
    // begin parsing
    if (debugbool) console.log("loading html to cheerio...");
    let $ = cheerio.load(html_main); // move fetched html into cheerio api for parsing

    // grab comments and store as an array to an array (2D array) 
    // each entry in 'comments' follows the format [<op>, <content>],.
    let comments = [];
    let comment = [];

    $('article').find('div', '._13XTP _1eJPh GgVyz').each(function(index, element) {
        if ($(element).contents().text() !== '') {
            comment.push($(element).contents().text());
        } else {
            if (debugbool) console.log("adding comment content to variable...");
            comment.push($(element).parent().attr('id').slice(8));
            comments.push(comment);
            comment = [];
        }
    });



    comments.shift();
    return comments;
}