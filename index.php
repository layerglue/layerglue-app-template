<?php
	function is_dev_host() {
		// Add host names here to render the page with non-compressed js files, partial string matches are ok
		$dev_hosts = array('localhost', '192.168.1');
		foreach ($dev_hosts as $value) {
			if (strpos($_SERVER['HTTP_HOST'], $value) !== false) return true;
		}
		return false;
	}
?>

<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title></title>
	<meta name="description" content="">
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"> -->
	<!-- <meta name="apple-mobile-web-app-capable" content="yes"> -->
	<link rel="stylesheet" href="styles/css/style.css">
	<script src="js/compiled/libs/modernizr-2.5.3-min.js"></script>
</head>
<body>
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
	<div id="main" role="main"></div>

	<?php include "templates/templates.html"; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/compiled/libs/jquery-1.7.1.min.js"><\/script>')</script>

	<?php if (is_dev_host()) { ?>
		<!-- Plugins -->
		<script src="js/source/libs/jquery-css-transform.js"></script>
		<script src="js/source/libs/jquery-animate-css-rotate-scale.js"></script>
		<script src="js/source/libs/jquery.easing.1.3.js"></script>
		<script src="js/source/libs/underscore.js"></script>
		<script src="js/source/libs/backbone.js"></script>

		<!-- Layerglue -->
		<script type="text/javascript" src="js/source/libs/layerglue/LayerglueSetup.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/jquery.layerglue.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/io/LoadEvents.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/io/ImageLoader.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/io/JSONLoader.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/io/MultiLoader.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/io/LoadManager.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/math/MathUtils.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/string/StringUtils.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/core/NotificationCentre.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/constants/SystemEvents.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/sequencer/SequencerEvents.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/sequencer/SequencerStates.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/sequencer/AnimationSequencerItem.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/sequencer/ParallelSequencer.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/sequencer/SeriesSequencer.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/views/BaseView.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/views/TransitionableView.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/views/BasePageView.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/route/Route.js"></script>
		<script type="text/javascript" src="js/source/libs/layerglue/route/BaseRouter.js"></script>

		<!-- App -->
		<script type="text/javascript" src="js/source/main.js"></script>
		<script type="text/javascript" src="js/source/src/App/constants/PageConstants.js"></script>
		<script type="text/javascript" src="js/source/src/App/routers/AppRouter.js"></script>
		<script type="text/javascript" src="js/source/src/App/views/SiteView.js"></script>
		<script type="text/javascript" src="js/source/src/App/views/controls/ProgressBar.js"></script>
		<script type="text/javascript" src="js/source/src/App/views/pages/PreloaderPageView.js"></script>
		<script type="text/javascript" src="js/source/src/App/views/pages/HomePageView.js"></script>

	<?php } else { ?>
		<script src="js/compiled/libs/plugins.js"></script>
		<script src="js/compiled/libs/layerglue.js"></script>
		<script src="js/compiled/script.js"></script>
	<?php } ?>
</body>
</html>