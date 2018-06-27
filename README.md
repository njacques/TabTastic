# TabKommander

TabKommander is a Chrome extension that will grab all of your open tabs and display them in an 'inbox', allowing you to sort them into folders, tag them, and search through them. It is primarily aimed at developers, to help them keep on top of articles and tutorials.

**Important Note**: the extension is still very much a work-in-progress, and there are still important features to be added before we consider it to be useful. That said, please feel free to give it a whirl and let us know what you think.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need Node/npm installed in order to compile the extension.

### Installing

Clone the git repo to your local machine:

```bash
git clone git@github.com:njacques/TabTastic.git
```

Change into the project folder, and install the dependencies via npm:

```bash
npm i
```

To build the extension, run the `build` script.

```bash
npm run build
```

Alternatively, you can run the dev server, which will allow hot reloading during development (note: this is a little flakey since adding Vue).

```bash
npm run start
```

After running either of the above, install the extension into Chrome:

1.  Open the Extension Management page by navigating to `chrome://extensions`.
2.  Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3.  Click the **LOAD UNPACKED** button and select the extension directory.

## Running the tests

There are currently only a handful of tests, but you can run them via npm:

```bash
npm t
```

## Built With

- [Vue.js](https://vuejs.org/) - JavaScript framework
- [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable) - Drag-and-drop component based on Sortable.js
- [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate) - A starter template for building Chrome extentions with webpack.

## Contributing

The extension is still very much a WIP, but we welcome suggestions, bug fixes, or other contributions.

## Authors

- **Nilson Jacques** - [GitHub](https://github.com/njacques)
- **Jim Hibbard** - [GitHub](https://github.com/jameshibbard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- The UI layout is based on the Inbox template by [Dan Supernault](https://github.com/dansup)
