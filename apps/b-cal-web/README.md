# b-cal web

This app came about after a friend and I joked about what it would be like if our calendar had no months, just 365 to 366 days. So the Beluvian Calendar was created. Parts of it are inspired by the Gregorian Calendar.

- The grid used to display it has 7 columns although even I'm not really sure if weekends exist in this fictional world.
- There is a leap day in place of where February 29th would be on a Gregorian Calendar. It has its own name and only shows up on leap years.

It turned out to be a very good programming excercise to learn how to deal with dates using ~~Moment.js~~ Luxon.

## Calendar Comparison

### Gregorial Calendar

- 12 named months
- 7 named days
- 28 to 31 days per month

### Beluvian Calendar

- No separate named months
- No Monday - Friday
- 365 to 366 days per year each with its own name

## Nx-ification

b-cal was originally created in a standard single app Angular project created with the Angular CLI. Some time after that I became interested in learning a bunch of new technologies related to Angular. Some of those being Nx, NgRx, and Ionic.

I brought the original b-cal project into this workspace then refactored it into the different workspace library types Nrwl recommends. One of the many benefits of this is code sharing. So I create a mobile version [b-cal-mobile](apps/b-cal-mobile/README.md) with Ionic to see how code sharing between a web and mobile version would work.

Here is an example of the folder structure:

```
├─ apps
│  ├─ b-cal-mobile
│  └─ b-cal-web
└─ libs
   └─ b-cal
      └─ year
         ├─ mobile
         │  ├─ feature
         │  └─ ui
         ├─ shared
         │  ├─ data-access
         │  └─ util
         └─ web
            ├─ feature
            └─ ui
```

## Deploying to Firebase

Setup for deploying from a monorepo was inspired by [@simondotm/nx-firebase](https://github.com/simondotm/nx-firebase)

```shell
$ npm install -g firebase-tools
$ firebase login
$ firebase deploy -P b-cal --only hosting --config firebase.b-cal.json
```

## Notes

Some AI prompt ideas
Give it some initial paragraphs for some world building, then...
What happened on November 7th?
What happened on November 7th, Essday?
The encylopia entry for Essday reads...
