# Goat Take-Home Exercise

This is a react application built with [vite](https://vitejs.dev/)

[![Screen shot](https://img.youtube.com/vi/-Ta4Q6pGTI4/0.jpg)](https://www.youtube.com/watch?v=-Ta4Q6pGTI4)

# Environment
- node version v16+

# Setup
```bash
# install dependency
yarn install

# start serve
# default run on http://localhost:8081/
# if you want to change port check => <project>/vite.config.ts
yarn serve
```


# Test
```bash
# Run test and output result on console
yarn test
# Run test and output coverage report
yarn coverage
# Run test with realtime watch
yarn test:watch
```

# Setup mock api server
```bash
# Get json-server
yarn global add json-server
source ~/.zshrc # or ~/.bash_profile

# startup
json-server ./api.json --port 5000
```
:warning: Mac use port 5000 for <b>Airplay Receiver</b> service.  
To stop the service: Preference > Sharing > [Airplay Receiver]


# Acceptance
- [x] It is a React application.
- [x] The collection shows 20 shoes initially.
- [x] The user can take an action to load more shoes.(Scroll to bottom load more data)
- [x] Click to show shoe detail

# Self-Grading
- [x] Clear README
- [x] Responsive
- [x] Test code
- [x] Clean architecture
- [x] User can filter shoes by name or shoe condition
- [x] User can sort result by price, release date

# Structure Summary
| Description                        | View                                              | Store                              |
| ---------------------------------- | ------------------------------------------------- |:-----------------------------------|
| Shoe grid view                     | SneakerGridPage.tsx                               | sneakerSlice.ts                    |
| Shoe detail view                   | SneakerDetailPage.tsx                             | sneakerDetailSlice.ts              |