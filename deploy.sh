#!/bin/bash

DEST=/srv/www/recipes

cp -r *.html src assets package.json ${DEST}
cd ${DEST}
npm install