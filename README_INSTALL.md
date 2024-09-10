
# Android Phone as a Webserver

** Termux

 Install termux app terminal from the page <https://github.com/termux/termux-app/releases>

 update packages:

``` console
 
> pkg updates
> pkg upgrade
> pkg install nodejs-lts
> pkg install git

```

Install Postgres

```console

apt update && apt install postgresql
mkdir ./postgres && initdb ./postgres
pg_ctl -D ./postgres start

# Login:
psql -d postgres

# Quit:
\q

# stop
pg_ctl -D ./postgres stop

```

# blog-express use case

# Project based on: (I turned my Phone into a Node.js Web Server!)<https://www.youtube.com/watch?v=_zrTZphAaAk>
