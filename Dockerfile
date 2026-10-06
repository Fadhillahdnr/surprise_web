FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html style.css script.js contact.jpg /usr/share/nginx/html/
COPY frames/ /usr/share/nginx/html/frames/
COPY media/ /usr/share/nginx/html/media/

EXPOSE 80
