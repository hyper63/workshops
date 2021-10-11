curl -X PUT localhost:6363/data/mario-wiki-dev
curl -X POST localhost:6363/data/mario-wiki-dev/_bulk \
-H 'Content-Type: application/json' \
-d @scripts/characters.json \
| npx prettyjson

curl -X POST localhost:6363/data/mario-wiki-dev/_bulk \
-H 'Content-Type: application/json' \
-d @scripts/games.json \
| npx prettyjson