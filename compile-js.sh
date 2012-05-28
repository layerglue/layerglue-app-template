#!/bin/bash
#
# Concatenates and optionally compresses javascript files
# Use the -compress option to compress, eg: compile-js.sh -compress 
#
# Requires Node.js and uglifyjs module (installed globally)
#
# Some common Uglify JS options:
# -b 	beautify (don't remove whitespace)
# -nm 	don't mangle variable or function names
# -nc 	remove top-most comment from the first file
# -o 	output to file

PLUGINS='
js/source/libs/jquery-css-transform.js
js/source/libs/jquery-animate-css-rotate-scale.js
js/source/libs/jquery.easing.1.3.js
js/source/libs/underscore.js
js/source/libs/backbone.js
'

LAYERGLUE='
js/source/libs/layerglue/LayerglueSetup.js
js/source/libs/layerglue/jquery.layerglue.js
js/source/libs/layerglue/io/LoadEvents.js
js/source/libs/layerglue/io/ImageLoader.js
js/source/libs/layerglue/io/JSONLoader.js
js/source/libs/layerglue/io/MultiLoader.js
js/source/libs/layerglue/io/LoadManager.js
js/source/libs/layerglue/math/MathUtils.js
js/source/libs/layerglue/string/StringUtils.js
js/source/libs/layerglue/core/NotificationCentre.js
js/source/libs/layerglue/constants/SystemEvents.js
js/source/libs/layerglue/sequencer/SequencerEvents.js
js/source/libs/layerglue/sequencer/SequencerStates.js
js/source/libs/layerglue/sequencer/AnimationSequencerItem.js
js/source/libs/layerglue/sequencer/ParallelSequencer.js
js/source/libs/layerglue/sequencer/SeriesSequencer.js
js/source/libs/layerglue/views/BaseView.js
js/source/libs/layerglue/views/TransitionableView.js
js/source/libs/layerglue/views/BasePageView.js
js/source/libs/layerglue/route/Route.js
js/source/libs/layerglue/route/BaseRouter.js
'

APP='
js/source/main.js
js/source/src/App/constants/PageConstants.js
js/source/src/App/routers/AppRouter.js
js/source/src/App/views/SiteView.js
js/source/src/App/views/controls/ProgressBar.js
js/source/src/App/views/pages/PreloaderPageView.js
js/source/src/App/views/pages/HomePageView.js
'

if [[ $# -gt 0 && $1 == '-compress' ]]
then
	echo "Concatenating and compressing javascript files..."
	for file in $PLUGINS
	do
		cat $file
	done | uglifyjs -nc -o js/compiled/libs/plugins.js
	for file in $LAYERGLUE
	do
		cat $file
	done | uglifyjs -nc -o js/compiled/libs/layerglue.js
	for file in $APP
	do
		cat $file
	done | uglifyjs -nc -o js/compiled/script.js
else
	echo "Concatenating javascript files..."
	for file in $PLUGINS
	do
		cat $file
	done > js/compiled/libs/plugins.js
	for file in $LAYERGLUE
	do
		cat $file
	done > js/compiled/libs/layerglue.js
	for file in $APP
	do
		cat $file
	done > js/compiled/script.js
fi
