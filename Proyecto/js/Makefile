#Makefile for build the ProyProc.js 
NAMES=head SProc Canvas System Queue Server Task bottom
SOURCES=$(addsuffix .js,$(addprefix ./src/,$(NAMES)))

all: clean
	cat $(SOURCES) > ProyProc.js

clean:
	rm -rf ProyProc.js