# bash
bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:6006)" != "200" ]]; do sleep 5; done'

# also check https://gist.github.com/rgl/c2ba64b7e2a5a04d1eb65983995dce76