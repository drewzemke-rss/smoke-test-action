# Smoke Test

Iteratively checks a URL until it receives a status code 200. Uses an *exponential backoff* strategy, meaning wait types increase multiplicatively between consecutive attempts to reach the URL.

## Usage

Jam this step in your workflow: 
```yaml
      - name: Smoke Test
        uses: "drewzemke-rss/smoke-test-action@main"
        with: 
          url: <URL_TO_CHECK> 
          wait_seconds: 3
          retries: 20
          factor: 2
```
The `url` input is required, but the other three are optional and will default to the values above if not provided.


## Development

This is TypeScript project, but the GH action runs out of `dist/index.js`. This means that the project needs to built *before* pushing changes.

```shell
pnpm build
git push 
```

At some point I'll add a GH workflow to this project that makes sure this has happened (or to do it automatically). For now, just don't forget ;) 
