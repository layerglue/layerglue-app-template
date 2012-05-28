#Layerglue Site Template

Base HTML & Javascript site template built on Backbone.js.

##Build tools

The site template relies on Less CSS and Uglify JS to concatenate and compress files. You can find more information about these utilities here:

* http://lesscss.org/
* https://github.com/mishoo/UglifyJS

###Build using shell scripts

There are a couple of shell scripts that can automate the build process. Both require Node.js, with the __less__ and __uglifyjs__ modules installed in global mode. If you have Node.js you can install these modules with the following commands:

`npm install -g less  
npm install -g uglify-js`

####Compiling the Less files

* `compile-less.sh` compiles the less files into the css folder. By default the files are compiled without compression, add the -compress option to the shell script to enable it: `compile-less.sh -compress`
* `compile-js.sh` concatenates and compresses the javascript files. By default the files are only concatenated, add the -compress option to the shell script to enable it: `compile-js.sh -compress`

####Alternative utilities

Instead of using the shell scripts you can use CodeKit, which uses the same build tools but adds a GUI to the process: http://incident57.com/codekit/
