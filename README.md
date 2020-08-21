# chi-covid19-narrative
This project uses the Chart.js library to visualize data available through Chicago Data Portal's APIs about the City's response to COVID-19. You can view the GitHub Pages website for this repo at [crunes.github.io/chi-covid19-narrative](https://crunes.github.io/chi-covid19-narrative/), which uses the [latest version of the Chicago Design System theme](https://github.com/Chicago/design-system-site).

## Installation
The first step is to install the Chart.js library. You can install Chart.js in a couple of ways.

1. Use a CDN

This is how I included Chart.js because it is easy and fast. You can grab the latest CDN link from [https://cdnjs.com/libraries/Chart.js](https://cdnjs.com/libraries/Chart.js). Copy the URL that has Chart.min.js at the end.

At the time of this writing, the latest version is 2.9.3, so I used the following link:

`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js`

2. Use npm

Copy and paste the command below to download it in your project: 

`npm install chart.js --save`

## Setup
From Chicago Design System repo:

### CSS
Copy and paste the stylesheet links into the of your site or before all other stylesheets to load our CSS.
* Our Bootstrap implementation: https://webapps1.chicago.gov/cdn/chiwds/0.9.3/css/main.min.css
* Font Awesome icons (5.13.0): https://webapps1.chicago.gov/cdn/FontAwesome-5.13.0/css/all.min.css
* Accessible datepicker:
  * https://webapps1.chicago.gov/cdn/chiwds/0.9.3/css/main.min.css
  * https://webapps1.chicago.gov/cdn/chiwds/0.9.3/css/main.min.css

### JavaScripts
Because we are an implementation of Boostrap 4.x.x you will need to add the following javascripts in order to use all the components available for Bootstrap:
* https://webapps1.chicago.gov/cdn/jQuery-3.4.1/jquery-3.4.1.min.js
* https://webapps1.chicago.gov/cdn/Bootstrap-4.3.1/js/bootstrap.bundle.min.js
* https://webapps1.chicago.gov/cdn/chiwds/0.9.3/js/uswds.min.js
* Accessible datepicker: https://webapps1.chicago.gov/cdn/chiwds/0.9.3/js/datepicker.js
