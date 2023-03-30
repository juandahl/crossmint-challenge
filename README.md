# Crossmint

Interview Exercises
## Phase 1

I did a board which manually call the API endpoint clicking on the specific cell. That was improve on the second phase where we needed to do it automatically.
There is a branch phase 1 with this partial code

## Phase 2

### CONSIDERATION

- I wait 350 ms before calling the API endpoint because I had an error 429(too many requests). I am not sure if it was part of the problem or just vercel do it automatically to avoid overusing the API endpoints.

### THECNOLOGIES

Besides React, I add to the process typescript, linter and react-query to improve the code readability and performance(react-query).


### DESIGN

I used a factory pattern to create the cell variations. Each object encapsulates a list of methods that allows us to save particular properties and differences on calling the API endpoints.

### TESTING

In order to implement some tests, I choose the adjacent algorithm.
However, the implementation is thought as following the testing principles. For example, each component or function has some dependencies injected into it so it should be all easy testable.
For example, it should be easy to mock api calls and candidate id.