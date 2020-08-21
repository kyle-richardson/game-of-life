This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Conway's Game of life

Deployed using Netlify: [Game of Life](game-of-life-kyle.netlify.app)

### Custom Features

Implement at least 3 of the following features:

* Create a few sample cell configurations that users can load and run
[x] Add an option that creates a random cell configuration that users can
  run
* Add additional cell properties, like color or size, and incorporate
  them into your visualization
[x] Allow users to specify the speed of the simulation
[x] Provide functionality to manually step through the simulation one
  generation at a time, as opposed to animating automatically
* Allow users to change the dimension of the grid being displayed
* Given a specific generation, calculate the configuration of cells at
  that point in time, and jump to that state, bypassing animation (i.e.
  skip ahead _n_ generations).
* If you have an idea for a custom feature on this list, run it by your
  TL or instructor

#### About

* On the main entry point of the application, include a separate section
  or link to another page or popup that describes the two main rules
  (birth & death) of Conway’s Game of Life

## Stretch Goals

* Implement 2+ additional custom features, above
[x] Deploy your app to a hosting service or, for iOS, to TestFlight (or
  the App Store!). Web devs can see [more deployment info
  here](resources/web/deployment).
* Write a how-to guide or blog post that walks readers through the
  work you did to implement your project
* Expand your simulation into the third dimension. Google `3D Conways
  Life`. Google for how to do 3D stuff on your platform. Web users might
  check out [3D-ThreeJS](https://github.com/LambdaSchool/3D-ThreeJS),
  and iOS might look at [SceneKit](https://developer.apple.com/scenekit/).
* Explore alternate algorithms for finding the nth generation, such
  as [Hashlife](https://en.wikipedia.org/wiki/Hashlife)