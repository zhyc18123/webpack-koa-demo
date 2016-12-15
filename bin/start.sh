#!/bin/bash

#############################################
# fileName     :
# createAt     : 2016-12-03 10:24:30
# modifyAt     : 2016-12-07 09:52:24
# authorIs     : luyi
# authorEmail  : luyiwmm@gmail.com
# description  :
#############################################

exec node koa/server.js $ENV > /var/log/node.log 2>&1 &
#exec php search-engine/Applications/Search/start_web.php restart -env $ENV
exec php search-engine/start.php restart -env $ENV
