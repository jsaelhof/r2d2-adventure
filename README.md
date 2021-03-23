## Challenge: R2-D2 Adventure

#### by Jason Saelhof (jsaelhof@gmail.com)

This is my submission for the R2-D2 challenge. Original instructions are included at the bottom of this file.

The requirements for this project were to complete the challenge by creating a console app. My take on the project was to use a React.js app to provide a visual front-end, which I cleared with Ambyint prior to starting. The core logic written to control the app would be very similar in a console application. I felt a React app allowed me to write this logic as well as show a React front-end.

I used [Create React App](https://github.com/facebook/create-react-app) to generate a default React app that includes features such as the Jest unit test framework. I added Enzyme to the project for testing of React components. I was able to write unit tests to cover both the business logic of the app as well as the display of the React components.

src/components/App.js is the main component of the app and manages all the state.

#### Challenges

The main challenges were on the visual side. One issue was fitting the 100x100 grid entirely in the viewport while making the characters large enough to be seen easily. Initially I had planned on using images of R2-D2 and Obi Wan but they were too small to be seen clearly on the map, particularly when I needed to be able to display which direction they were facing. With more time, I think that I would have either made the map draggable or provided a two-part mini-map and zoomed-in map view.

Another visual issue was with adding some responsiveness to the app. Due to the time constraints of the challenge, I didn't set out to build the app to work perfectly across mobile devices but after I got the app working, I started working to make it fit the viewport if it was too small in one dimension. I did this by using a CSS transform since much of the UI is absolutely positioned within the main container. When using the scale transform in CSS, the browser renders the container using the natural size of the content and then resizes after. The result is that the smaller you scale it, the more whitespace there is around it since it still takes up it's natural size in the document flow. To deal with this I wrote a resize function that calculates the size of the content after the scaling and dynamically sets CSS styles to properly fit it in the viewport.

Performing the resizing accurately across all browsers and mobile devices requires dealing with how various browsers measure the viewport. To deal with this, I ended up bringing in jquery just for it's .width() and .height() methods which work very well cross-platform. Once I started using jquery, my unit tests for the Resize function stopped working correctly as it seems to always measure a width and height of 0 in the unit test DOM. I would work to remove the dependence on jquery and/or find a way to unit test it properly. As a result I'm missing a few lines of coverage in my tests.

Since I had basic resizing working, I tested it on a few mobile devices through BrowserStack. The scaling feature does work to make it fit but some mobile devices are not vertically centering the game properly and it's appearing far too small anyway. Please see my note in the Future Enhancements section below where I mention how I would use breakpoints to create a new mobile layout, likely below approximately 600 pixels.

Finally, Creating the opening crawl also took a bit of work to time up the animations and find the correct CSS values for the perspective to look right. I used a few media breakpoints to adjust the font size and animation timings to work better at narrower widths.

#### Future Enhancements

These are some ideas I had about how I could improve on the project if I were to continue developing it.

- I think it would be fun to write a nodejs server side to handle tracking the characters movements. This would move the client-side business logic of the game to the server. I would have it make a request to the server with the move information and then have the server track the characters position and respond with updates to the client. By doing this, I think it would be fairly simple to create a multiplayer version of the game where additional clients could connect to the same server and operate additional hero characters such as C-3P0. All clients would be able to see all connected players but only issue control commands for their own.

- I would add SASS to the project to allow the use of variables in the CSS. There are a few number and color values throughout the CSS that are repeated more than I would like. SASS would make it simpler to make changes to game's display, particularly the board sizing which requires repeated use of the width and height values.

- To make it function better on mobile devices, I would add media breakpoints to layout the UI differently at a smaller size. As it is, the game does scale to fit the viewport but at a certain point things are simply too small to be used properly on a smartphone. I would make smaller versions of the character's UI, likely positioned above or below the board. I would probably need to implement either a draggable board or rework the grid to resize itself using JavaScript instead of CSS.

- I would refactor some of the unit tests to try and centralize some of the setup that is common to multiple tests. This would make the unit tests more DRY.

- I would extract all the text strings used in the front-end into a language resource file. This would make localization possible.

- The "Report" feature is not as useful with a full UI as it would be in a console app. I implemented it to be consistent with the requirements but found it useful for highlighting the characters on the map. The panel that appears below each character on the map can get cut off when the characters are close to the right or bottom edges. I would add some code to measure this and alter the styling to keep the report panel within the boundaries of the map.

#### Thank You

Thank you for your consideration of my submission. I'd be happy to discuss my thought processes, design decisions, or coding practices about any part of the project.

---

## Running and Testing the App

In the project directory, you can run:

### 'npm install`

Installs dependencies to build the project

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test -- --coverage`

Runs the unit tests and prints a coverage report.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

---

Original Instructions:

## R2-D2 Exercise

The year is 1977, Star Wars: A New Hope has just been released. The true hero of the film, R2-D2 has acquired Death Star plans and needs to deliver them to Obi Wan Kenobi on the surface of Tatooine to help ensure victory for the rebellion. The problem is that upon landing R2-D2 has lost all autonomy and needs your to help guide him safely to Obi Wan Kenobi through manual commands.

## Description

- The application is a simulation of R2-D2 landing on Tatooine, the goal is to deliver the plans to Obi Wan at his location by entering manual commands
- The planet is conveniently a 100x100 grid
- R2-D2 is free to roam around the surface of the Tatooine, but must be prevented from falling off the edge because it is apparently a flat planet
- Any movement that would result in R2-D2 falling must be prevented, however further valid movement commands must still be allowed
- On R2-D2 successfully reaching Obi Wan Kenobi we should celebrate our success and exit the application

## Requirements

#### Acceptable Commands

- **LAND**

  - randomly place R2-D2 on the planet
  - randomly place Obi Wan Kenobi on the planet
  - report the location of both R2-D2 and Obi Wan as a grid coordinate and facing direction
  - The origin (0,0) can be considered to be the SOUTH WEST most corner. - If R2-D2 has already landed ignore this command

- **MOVE (x)** will move R2-D2 (x) units forward in the direction it is currently facing
- **LEFT and RIGHT** will rotate R2-D2 90 degrees in the specified direction without changing the position of the robot
- **REPORT** report the location of both R2-D2 and Obi Wan as a grid coordinate and facing direction

#### Constraints

- R2-D2 must not fall off the table during movement. This also includes the initial placement of the toy robot.
- Any move that would cause the robot to fall must be ignored

#### Example Input and Output

```
> LAND
R2-D2 is at 0,0 facing North
Obi Wan Kenobi is at 12,13

> MOVE 2

> REPORT
R2-D2 is at 0,2 facing North
Obi Wan Kenobi is at 12,13

> MOVE 11

> RIGHT

> REPORT
R2-D2 is at 0,13 facing East
Obi Wan Kenobi is at 12,13

> MOVE 12
Congratulations, you've saved the Rebellion!
exit(0)
```

## Submission Instructions

- Clone this repository and commit your changes locally (or to a separate remote repository)
- Use any packages or libraries which help you to complete these tasks
- When you are finished, please send us a link to the completed repository or a zip of the contents if you prefer
- Describe any challenges that made the task more difficult

![R2-D2](https://c1.staticflickr.com/1/629/21546484114_2f734ebb5e_b.jpg)
