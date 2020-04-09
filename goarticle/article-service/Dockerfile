FROM alpine:latest

RUN mkdir /app
COPY /data /app/data


WORKDIR /app

ADD article-service /app/article-service

CMD ["./article-service"]
