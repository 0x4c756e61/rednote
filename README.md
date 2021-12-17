# DESCRIPTION
RED themed version of the `Index Eductation` well knowed homework app called `PRONOTE`  

---
<img src="front.png" width="250"></img>

## Installation
1) In the `release` tab **download** the apk
2) **Send** it to your android phone
3) **Install** it
### Note
You may have to uninstall the origin apk and install the new one because the apk is signed with my own key.

You have to do that one time **only**

---

## Using themes
To use themes
1) Go to settings
2) in the `Theme name` section enters
 - default | For the default red theme
 - pornote | For a pornhub like experience
 - classic | Default Pronote theme (wrong colors tho) 

---

## Building
### Requirements
- APKTOOL
- JDK11 (for jarsigner)
- adb (to install/update the app)

### Process
#### Creating a key
1) create a dist folder: `mkdir dist`
2) cd into dist: `cd dist`
3) run the command below **ONE TIME ONLY**
```
~$ keytool -genkey -v -keystore my.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias app
```
Congrats! Your key as been created!

#### Building the apk
1) cd back into the project's **root dir**: `cd ..`
2) use **apktool** to build: `apktool b`

Your app as now been built and is located at `dist/REDNOTE.apk`

### Note
If your android device is rooted you don't need to sign the apk, if it isn't you need to follow the further steps.

#### Signing
1) cd back into the dist dir: `cd dist`
2) sign the apk: 
```
~$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my.keystore REDNOTE.apk app
```

You successfully build & signed the app! You can now install it or share it!

#### Installing throught adb
1) Plug in you phone with USB debugging on
2) Install the app with adb: `adb install -r REDNOTE.apk`

If it gives any errors, uninstall the app and install it back manually
