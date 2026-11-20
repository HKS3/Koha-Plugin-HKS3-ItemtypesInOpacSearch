.PHONY: install

install:
	rsync -av Koha ${PLUGINS_DIR}/

build:
	zip -r plugin.kpz Koha
