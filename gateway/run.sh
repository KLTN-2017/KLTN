docker build -t gateway:1.0.0 .
docker build -t tour-service:1.0.0 -f /home/hale/Desktop/KLTN/tour-service/Dockerfile /home/hale/Desktop/KLTN/tour-service
docker build -t user-service:1.0.0 -f /home/hale/Desktop/KLTN/user-service/Dockerfile /home/hale/Desktop/KLTN/user-service
docker build -t car-hotel-service:1.0.0 -f /home/hale/Desktop/KLTN/car-hotel-plan-service/Dockerfile /home/hale/Desktop/KLTN/car-hotel-plan-service
docker build -t fontend-client:1.0.0 -f /home/hale/Desktop/KLTN/my-app-travel/Dockerfile /home/hale/Desktop/KLTN/my-app-travel
docker build -t fontend-admin:1.0.0 -f /home/hale/Desktop/KLTN/my-app-travel-admin/Dockerfile /home/hale/Desktop/KLTN/my-app-travel-admin



docker-compose up