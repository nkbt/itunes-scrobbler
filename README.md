# itunes-scrobbler

Scrobble retrospectively play counts and loved tracks to Last.FM from iTunes database.


# Install

```sh
npm install -g itunes-scrobbler
```


# Run

You will need to have LastFM developer account
Check http://www.last.fm/api on how to obtain API key and Secret.


Create `secret.json` and fill all the values:
```json
{
  "LASTFM_API_KEY": "Your LastFM API key",
  "LASTFM_SECRET": "Your LastFM App secret",
  "LASTFM_USER": "Your LastFM username",
  "LASTFM_PASSWORD": "Your LastFM password"
}
```

Or run `itunes-scrobbler` with these ENV variables:

```sh
export LASTFM_API_KEY=123
export LASTFM_SECRET=123
export LASTFM_USER=123
export LASTFM_PASSWORD=123 

itunes-scrobbler
```

Note that it will create `itunes` folder to keep database.
Next time you should run it in the same folder again and it will not submit same tracks again.


# PS

Check out [scrobbler](https://www.npmjs.com/package/scrobbler) tool if you want to manually bulk scrobble 
