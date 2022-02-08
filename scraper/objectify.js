const fs = require('fs');

// converts arrays into objects to store.
module.exports = async function objectify(discussioncomments, id, discussionname, topdiscussions, mainurl, debugbool) {

    let discussion = {};

    let commentsobj = {};
    let basecommenturl = mainurl.concat('?page=+++#comment-$$$');
    for (let i = 0; i < discussioncomments.length; i++) {
        let comment = {};
        let workingurl = basecommenturl.replace("+++", discussioncomments[i][3]).replace('$$$', discussioncomments[i][2]);
        comment['ms-id'] = discussioncomments[i][2];
        comment['onpg'] = discussioncomments[i][3];
        comment['op'] = discussioncomments[i][0];
        comment['content'] = discussioncomments[i][1];
        comment['link'] = workingurl;
        commentsobj['comment ' + i] = comment;
    }

    let topdiscussionobj = {};
    topdiscussionobj['1'] = topdiscussions[0];
    topdiscussionobj['2'] = topdiscussions[1];
    topdiscussionobj['3'] = topdiscussions[2];
    topdiscussionobj['4'] = topdiscussions[3];
    topdiscussionobj['5'] = topdiscussions[4];

    discussion['name'] = discussionname;
    discussion['id'] = id;
    discussion['link'] = mainurl;
    discussion['comments'] = commentsobj;
    discussion['top discussions'] = topdiscussionobj;

    return discussion;


}