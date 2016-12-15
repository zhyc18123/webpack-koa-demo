#!/bin/bash

#############################################
# fileName     : docker.sh
# createAt     : 2016-12-03 17:39:45
# modifyAt     : 2016-12-08 11:41:22
# authorIs     : luyi
# authorEmail  : luyiwmm@gmail.com
# description  :
#############################################

MOUNT_ROOT=
MOUNT_CONFIG=/data/service/lopan/config/
MOUNT_UPLOAD=/data/service/lopan/upload/
MOUNT_LOG=/data/service/lopan/log/

PORT_NODE=3000
PORT_SEARCH=8888
PORT_STAT=2346

VERSION_IMAGE=1.0.1
ENV=test

usage() {
	echo "usage: $0 COMMAND"
	echo
	echo "Manage docker command"
	echo
	echo "Commands:"
	echo "   rmis remove all images"
	echo "   rmcs remove all containers"
	echo "   rmi [ID] remove one image"
	echo "   rmc [ID] remove one container"
	echo "   pre prepare dir"
	echo "   run run docker"
	echo
}

prepare() {
  if [ ! -d "$MOUNT_ROOT" ]; then
    if [ -n "$MOUNT_ROOT" ]; then
      echo "Root is valid."
      exit 1
    fi
  fi

  if [ ! -d "$MOUNT_CONFIG" ]; then
    mkdir -p "$MOUNT_CONFIG"
  fi

  if [ ! -d "$MOUNT_UPLOAD" ]; then
    mkdir -p "$MOUNT_UPLOAD"
  fi

  if [ ! -d "$MOUNT_LOG" ]; then
    mkdir -p "$MOUNT_LOG/node"
    mkdir -p "$MOUNT_LOG/php_log4c"
  fi

  cp ../koa/config/* "$MOUNT_CONFIG"
  cp ../search-engine/Applications/Search/Config/* "$MOUNT_CONFIG"
}

running() {
  cmd="docker run --name lopan -l VERSION=$VERSION_IMAGE -l SERVICE=lopan/lopan --rm"
  if [ -n "$PORT_NODE" ]; then
    cmd="$cmd -p $PORT_NODE:3000"
  fi
  if [ -n "$PORT_SEARCH" ]; then
    cmd="$cmd -p $PORT_SEARCH:8888"
  fi
  if [ -n "$PORT_NODE" ]; then
    cmd="$cmd -p $PORT_STAT:2346"
  fi
  if [ -n "$MOUNT_ROOT" ]; then
    cmd="$cmd -v $MOUNT_ROOT:/lopan/"
  fi
  if [ -n "$MOUNT_CONFIG" ]; then
    cmd="$cmd -v $MOUNT_CONFIG:/lopan/koa/config/ -v $MOUNT_CONFIG:/lopan/search-engine/Applications/Search/Config/"
  fi
  if [ -n "$MOUNT_UPLOAD" ]; then
    cmd="$cmd -v $MOUNT_UPLOAD:/lopan/search-engine/Applications/Search/Web/Resources/uploads/"
  fi
  if [ -n "$MOUNT_LOG" ]; then
    cmd="$cmd -v $MOUNT_LOG:/var/log/"
  fi
  if [ -n "$ENV" ]; then
    cmd="$cmd -e ENV=\"$ENV\""
  fi
  if [ -n "$VERSION_IMAGE" ]; then
    cmd="$cmd hub.docker.ipin.com:5000/lopan/lopan:$VERSION_IMAGE"
  fi

  eval $cmd
}

case "$1" in
	rmis)
    docker rmi $(docker images)
		;;

	rmcs)
    docker rm $(docker ps -a)
		;;

	rmi)
    docker rmi $2
		;;

	rmc)
    docker rm $2
		;;

	pre)
    prepare
		;;

	run)
    running
    #docker run -i -p 3000:3000 -p 8888:8888 -v /var/log/:/var/log -v $2:/lopan/ -e ENV="$3" hub.docker.ipin.com:5000/lopan/lopan:$4
		;;

	*)
		usage
		exit 1
		;;
esac
