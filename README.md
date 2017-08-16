Web based genome assembly visualization.

Prerequisites

    - npm installed. npm is a package manager for javascript node.js interpreter.
    - a fairly recent version of the Firefox browser (should support HTML5 canvas)


git clone -b master git@github.com:mgcam/elgiz.git
cd elgiz
npm install
export PATH=node_modules/.bin:$PATH
which http-server #should have this executable on the PATH
# starts a simple http server on port 9999
# to change the port, edit package.json
npm run babel
npm run testserver # CTRL-C in the shell to stop the server

It is expected that the mapping file is in the 'data' directory in the elgiz folder and is called 'test'. A soft link worked for me. You can change the path by editing the lib/demo.js file.

In you browser (Firefox), go to http://localhost:9999 or, if the server is not on your local machine, http://somehost:9999
