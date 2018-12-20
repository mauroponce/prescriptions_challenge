## Run locally
heroku local -f Procfile.dev
Or using foreman gem:
foreman start -f Procfile.dev

heroku login
heroku create
heroku apps:rename prescriptions-app

heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2

git push heroku master
heroku open

heroku run rake db:migrate