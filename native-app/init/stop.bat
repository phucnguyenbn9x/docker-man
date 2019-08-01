docker-compose -f docker-registry.yml down
timeout 5
docker-compose -f docker-compose.yml down
timeout 5