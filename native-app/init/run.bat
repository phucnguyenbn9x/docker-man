docker-compose -f docker-registry.yml up -d
timeout 5
docker-compose -f docker-compose.yml up -d
timeout 10