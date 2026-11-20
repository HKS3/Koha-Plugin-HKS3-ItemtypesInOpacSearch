.PHONY: install

install:
	rsync -av Koha ${PLUGINS_DIR}/
