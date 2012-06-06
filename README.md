#Layerglue Web Application Template

Layerglue is a JavaScript application framework that comes bundled with a best practice template. Based on Backbone.js and its inherent MVC architecture, Layerglue provides an unintrusive minimal project structure for HTML5 applications. Includes support for automatic convention based asset loading, and a sophisiticated animation sequencer that ties into the hash based navigation system.

###MVC Architecture

Layerglue takes the loose MVC architecture of Backbone and firms it up through a centralized system that registers views and provides conventions for connecting HTML templates with their JavaScript controllers and the models that supply their data.

###Structured routing

Backbone's routing system is deliberately basic, in that it allows different routes to be funnelled to specific handlers. Layerglue builds on this to provide a structured system where view controllers are registered against routes and when a navigation event occurs, the view is lazily created and its rendered output made available to the transitioning system, allowing it to be added to the DOM and transitioned in when necessary.

###Animation/Transition Framework

One of Layerglue's most powerful features is a nested, interruptible, reversible, animation sequencing system that integrates directly with the router. Each view defines its own transition in and transition out which can be as simple as the default opacity fades or can utilize the n-level nesting provided by series and parallel sequencers.

###Automatic asset loading

Asset loading can happen at a global or local level, with site wide assets defined globally and each view controller able to specify assets it requires. The system ensures that all assets required by a view are fully loaded before its rendered template is added to the DOM




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
