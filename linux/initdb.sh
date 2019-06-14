docker exec -i wi_mysql mysql -ui2g -pqwertyuiop wi_auth < ./lilnux/initdb/init-dbauth.sql
timeout 10s echo "Done"
