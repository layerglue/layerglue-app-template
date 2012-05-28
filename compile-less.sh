#!/bin/bash
#
# Script to compile LESS to CSS
# Use the -compress option to compress, eg: compile-less.sh -compress
#
# Requires Node.js and lessc module (installed globally)

lessc styles/less/style.less styles/css/style.css $1
