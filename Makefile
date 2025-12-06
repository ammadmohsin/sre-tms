.PHONY: create-volumes

create-volumes:
	docker volume create tms_mongo
	docker volume create tms_redis