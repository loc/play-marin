Renew the http cert
---

- Run:
  `ssh -i ~/.ssh/play-marin-gcp ssh://your-gcp-user-name@35.230.103.1`

- Inside the GCP box, run:
  `sudo docker run -it --rm --name certbot -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -v "/var/www/certbot:/var/www/certbot" certbot/certbot renew --webroot --webroot-path /var/www/certbot`

- Redeploy the site from Github
