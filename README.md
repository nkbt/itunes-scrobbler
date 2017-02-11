# itunes-scrobbler

Scrobble retrospectively play counts and loved tracks to Last.FM from iTunes database.


# Install

```sh
npm install -g itunes-scrobbler
```


# Run

Copy `secret.sample.json` to `secret.json` and fill all the values.

Or run `itunes-scrobbler` with these ENV variables:

```sh
export LASTFM_API_KEY=123
export LASTFM_SECRET=123
export LASTFM_USER=123
export LASTFM_PASSWORD=123 

itunes-scrobbler
```

Note that it will create `itunes` folder to keep database.
Next time you should run it in the same folder again.
