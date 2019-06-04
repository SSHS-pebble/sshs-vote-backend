## Preparing

Make a file called `.env` in the top directory with the contents below.

``` shell
# .env
DB_USER="jungbobu"
DB_PW="password01"
STUDENT=380
CANDIDATE=2
```

Install dependencies and start the server.

``` shellsession
$ yarn install # Or npm install if you prefer
$ yarn run start # Or `npm run start` if you prefer
```

## Generating [`code.txt`](code.txt)

The codes are pre-generated and lives in this repo.
By regenerating the codes, all DB data is lost, so please be careful.

``` shellsession
$ yarn run generate # Or `npm run generate` if you prefer
```

## Requesting

[`httpie`](https://httpie.org) allows to request JSON bodies in a convenient notation. Please see [`httpie's docs`](https://httpie.org/doc) to see how JSON bodies are constructed.

``` shellsession
$ # Trying to vote existing user...
$ http POST localhost:8000/vote id=jzb3a2uy vote:=0
HTTP/1.1 400 Bad Request
Connection: keep-alive
Content-Length: 40
Content-Type: text/plain; charset=utf-8
Date: Tue, 04 Jun 2019 14:34:44 GMT

{
    "error": "already-voted",
    "status": false
}
$ # Voting new user...
$ http POST localhost:8000/vote id=Xmxu7Y5a vote:=1
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 20
Content-Type: application/json; charset=utf-8
Date: Tue, 04 Jun 2019 14:39:57 GMT

{
    "status": "success"
}
$ # Getting all votes...
$ # -1 is not voted
$ http GET localhost:8000/vote
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 1164
Content-Type: application/json; charset=utf-8
Date: Tue, 04 Jun 2019 14:41:54 GMT

{
    "data": [
        1,
        -1,
        -1,
        ...
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ],
    "status": "success"
}
```
