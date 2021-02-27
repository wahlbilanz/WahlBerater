#!/bin/bash

ok=0
for i in $(find src | \grep component.ts)
do
    spec="${i/component.ts/component.spec.ts}"
    if [ ! -f "$spec" ]
    then
        echo "missing test for $i"
        ok=1
    else
        grep 'testAccessibility *(' "$spec" > /dev/null
        if [ "$?" -ne 0 ]
        then
            echo "no accessibility test in $spec"
            ok=1
        fi
    fi
done

exit $ok

