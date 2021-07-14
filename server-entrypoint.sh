#!/bin/bash

cp -r /opt/cache/node_modules/. /opt/project/node_modules/
exec node ace serve --watch
