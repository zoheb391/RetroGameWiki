#Retro Game Wiki

Thanks to Samuel Zaza for the inspiration/css for this project.

This project built on docker microservice architecture uses node, express & react-redux setup to write and store games to a mongodb instance.
Reading is however done on an elastic search cluster via async redux-saga requests to allow full-text search capabilities on wiki entries. The ETL process is handled by transporter from IBM compose.

Thanks to @marcopeg for [humble cli](https://github.com/marcopeg/humble-cli) . It makes
running docker-compose commands less painful

