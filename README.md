## sdp-generator
   a simple boilerplate to start with react project.

## Installation

To install and work within the react-generator. Fork this repository and once you clone it locally run the following.

### Install packages:

```js
// Windows
npm install

// OSX
$ sudo npm install
```

### Create component:
```js
grunt create --component=NameOfTheComponent
```

### Component Folder Structure

```
+ components
  + name-component
    + scripts
      + actions
        - nameAction.js
      + stores
        - nameStore.js
      + views
        - nameView.jsx

      nameMain.js
    + styles
      - name.scss
    index.html
```

### Serve component in browser:
```js
grunt serve --component=NameOfTheComponent
```

server will start in http://localhost:7259/


### Build individual component:
```js
grunt build --component=NameOfTheComponent
```

### Build Folder Structure

```
+ dist
  + name-component
    + scripts
      - app.js
    + styles
      - style.css
    index.html
```