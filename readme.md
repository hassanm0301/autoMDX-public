[Description]
This software will automate logging in for the MDXplay website using nodejs puppeteer for the browser automation.

[Installation]
1. Clone or pull the repo
2. Navigate to index.js
3. Install the dependencies using the following commands on a terminal:
    "npm install puppeteer"
    "npm install prompt-sync"

[Usage]
1. Update the timetable.json file to fit your timetable
    The day number is the day of the week (1 is Monday, 2 is Tuesday...)
    The link should be the link where the class takes place, not the link to the MSX module page
2. Run the program by typing "node index.js"

[Known_bugs]
1. Puppeteer will not close automatically after a class has ended.
2. After closing puppeteer manually, the program will close, ending it. It will have to be rerun for the next class
