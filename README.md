# Adapt-Intro
![Example of intro being used](https://raw.githubusercontent.com/KingsOnline/repo-files/master/adapt-intro.gif)

An extension that uses [intro.js](http://introjs.com/) v2.3.0 with Adapt to present an overlay to be displayed explaining how the elements of a course are used. Recommended for larger courses or large courses where learners will be spending lots of time in Adapt. Works with Authoring Tool and Framework.

## Instructions
This extension targets elements by class name so you need to find out the name of the class of each element you want to target. You can do this by going into your web browsers developer tools. Press `F12` on PC, or `command alt i` on Mac. You can also right click elements on the page and inspect them.

Once found add the class name to either the Framework or Authoring Tool and then add a description.

Intro.js will navigate through elements in DOM order.

To start the tutorial press the '?' icon.

## Attributes
**_isEnabled** - boolean - required - Set to true to enable the extension.

**_steps** - array of objects - required - Array of elements which should be selected for adapt-intro.

**_options** - object - optional - Choose certain options to be enabled in your course. Documented [here](https://github.com/usablica/intro.js/wiki/Documentation#options). If empty no options applied. **Not currently supported in the Authoring Tool :(**

**_showOn** - array of strings - optional - Array of content objects that should enable adapt-intro icon. If empty shows on all pages.

**_showOnMenu** - Boolean - optional - Set to true to enable the extension on the menu page.

## Pro tips
* Add a adapt-intro.less file to your theme to allow you to easily customise the introduction to match your look and style.
* Use the option `exitOnOverlayClick: true` to prevent learners leaving the tutorial by accidentally click out.

## Todo
* Enable clicking of buttons to show the functionality further (e.g clicking PLP to expand the bar and then showing it as a tutorial).
* Option to start the tutorial without pressing the icon.
* Get options working in AT
