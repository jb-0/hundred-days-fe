#!/bin/bash

VERSION=$1
echo "*****************************"
echo "Running publish script"
echo "Version: ${VERSION}"
echo "::set-output name=NEXT_VERSION::${VERSION}"
echo "Finished publish script"
echo "*****************************"