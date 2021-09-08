To stand up a new server
---
- SSH to the new host
    - ensure it's pointing to static domain 35.230.103.1
- Run
  - ```
	sudo docker run -it --rm --name certbot
	 -v "/etc/letsencrypt:/etc/letsencrypt"
	 -v "/var/lib/letsencrypt:/var/lib/letsencrypt"
	 -p 80:80
	 certbot/certbot certonly
	 ```
  - Choose spin up a temporary webserver.
  - Enter `playmarin.org,*.playmarin.org`
- Edit `vim /etc/docker/daemon.json` and set `live-restore` to false.
- `sudo systemctl restart docker`
- sudo docker swarm init --advertise-addr <INTERNAL-GCP-IP>
- Find the entry for the known hosts in local SSH config and update Github secret.
- Deploy from Github.

