#!/bin/bash

docker-compose up -d
export MONGODB_URI=mongodb://localhost:27017/cz_suggestion_data_feeder
export PG_DATABASE_URI=jdbc:postgresql://chozoi-svr-3.svr.chozoi.services:5432/chozoi
export PG_USER=chozoiadmin
export PG_PASSWORD=123456789
export PG_HOST=chozoi-svr-3.svr.chozoi.services
export PG_DB=chozoi
npm run dev
