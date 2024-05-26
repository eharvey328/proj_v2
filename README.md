Dependencies:
    git: https://git-scm.com
    npm: https://www.npmjs.com
    python: https://www.python.org

Installation instructions:
    git: https://git-scm.com/downloads
    npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    python: https://www.python.org/downloads/

Once you have the dependencies installed, open up a terminal (or Powershell) window, and execute:

    git clone https://github.com/altyn-ge/proj_v2.git
    npm install
    python python/main.py
    npm run start

To publish local changes to actual website, run
    
    git run deploy

File Structure Overview:

    docx_files/*  - contains word documents that python code converts into js code
    python/*      - contains python code that generates js code
    src/*         - contains js/css source code that is actually deployed
