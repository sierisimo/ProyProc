#Makefile for build the ProyProc.js 
NAMES=head SProc SProc.Canvas System System.Result Queue Server Task bottom
SOURCES=$(addsuffix .js,$(addprefix ./src/,$(NAMES)))

all: clean
	cat $(SOURCES) > ProyProc.js

clean:
	rm -rf ProyProc.js