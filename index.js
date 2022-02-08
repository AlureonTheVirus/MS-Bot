/*
MIT License

Copyright (c) 2022 AlureonTheVirus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--

NOTE: This software is made in good faith. I, Alureon, ask that if any issues 
arise from the use of this software that no blame be placed on my head as the 
creator. I of course can not garentee such a request will be accepted as this 
kind of project seems to be the first of its kind on MS. All I ask is everyone's
utmost pacience. 
  
In the meantime, feel free to adapt and use this program however you like!

Thank you!
  ~ Alu.

  */

const scrape = require('./scraper/scraper-index.js');
var debugbool = true; // toggle debug logging in the console
var cachebool = true; // if true will genorate a cache.json which stores output
var discussiontofetch = 'https://musescore.com/groups/4489841/discuss/5125880';
const indexmain = async function() {
let discussion = await scrape(discussiontofetch, cachebool, debugbool);

/* As an example, this script fetches the content of this program's announcement discussion.
the scraped content is parsed and pushed to an object, the data that is is scraped goes as follows:
Name of the discussion, id of the discussion, the discussion link, all of the comments, and the top 5 discussions
found in the sidebar of the discussion. */

 console.log(await discussion); 
 
}

indexmain();
