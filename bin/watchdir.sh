#!/bin/bash

#############################################
# fileName     : watchdir.sh
# createAt     : 2016-12-03 15:02:32
# modifyAt     : 2016-12-03 15:07:20
# authorIs     : luyi
# authorEmail  : luyiwmm@gmail.com
# description  :
#############################################

path=$1
inotifywait -mrq --timefmt '%d/%m/%y/%H:%M' --format '%e %T %w %f' -e modify,delete,create,move $path
