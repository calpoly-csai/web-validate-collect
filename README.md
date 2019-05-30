# web-validate-collect

A web app for data validation and collection

### Inspiration:
* Mozilla's Common Voice Dataset (https://commonvoice.org)

### Current Objectives:
- [ ] Make user stores as GitHub Issues relating to basic audio recording functionality
  * A User can see that they are in the recording mode of the System
  * A User can click a button to begin recording
  * The System will collect background noise to gauge volume for a few seconds prior to recording
  * The System will record for a fixed amount of time
  * A User can click a button to begin playback of their own audio sample.
  * The System will prompt User to validate (keep/like) or invalidate (discard/dislike) the recording
  * The System will append the new recording to a queue for validation by other users.
- [ ] Make user stores as GitHub Issues relating to basic audio playback & validation functionality
  * A User can see that they are in the validation mode of the System.
  * A User can click a button to begin playback of an audio sample from another user.
  * The System will prompt User to validate (keep/like) or invalidate (discard/dislike) the recording after playing an audio sample from.
  * The System will keep track of the number of user validations that each audio sample has.



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
