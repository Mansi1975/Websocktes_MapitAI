# Makefile for WebSocket Chat Test Task

.PHONY: test
test: 
	python3 -m locust -f locustfile.py --headless -u 10 -r 2 -t 10s
