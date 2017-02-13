# Android Setup

## Get Started
- Clone the repository
- Do `npm install`
- Update the `constants` file

## Running the App
- Run `react-native run-android`

## Signing the App
The app signing configuration can be found in `/android/app/build.gradle`, by default it takes the following values from global grade properties.

```
 signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
 }
```

## Setup CodePush
- Run `react-native link react-native-code-push`

It will prompt CodePush Keys for both Android and iOS

## Building Release APK
 - Run `cd android && ./gradlew assembleRelease`
