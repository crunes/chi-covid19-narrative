# Visualizing Chicago's COVID-19 response 
## Exploring data visualization and storytelling platforms beyond dashboards

_In this post, I explain how I went from figuring out how to get "Hello World!" in my browser to comfortably navigating the wild world of chart.js documentation._

My interests in data, design, and policy merged during my summer fellowship at the [Chicago Department of Public Health](https://www.chicago.gov/city/en/depts/cdph.html) (CDPH). I wanted to put the skills I developed as a graduate student at the [University of Chicago's Computational Analysis and Public Policy](https://capp.uchicago.edu/) program to good use. I was also looking for opportunities to learn about web development and accessible design. I am grateful to have had the opportunity to work on a project that helped me achieve both of these goals.

## Project overview
The City of Chicago is in the process of modernizing its public data visualizations. It recently launched [a COVID-19 data dashboard](http://chi.gov/coviddash) created in PowerBI. The next phase is to build beautiful, custom JavaScript data visualizations that tell stories much like FiveThirtyEight and ProPublica features. I worked with the City's Chief Data Officer and Design Director to see what was possible, starting with the [chart.js](https://www.chartjs.org/) library. I approached them often for support and guidance, but ultimately, I was responsible for independently researching and experimenting with tools, as well as setting (and often rescoping) goals.

__Timeline__: 7/1/2020 - 8/28/2020 (8 weeks) 

__Expected deliverables__ 
- Weekly progress reports 
- JavaScript code that renders data visualizations 
- Memo outlining lessons learned and next steps 

__Structure__ 
- Daily (weeks 1-5) and then biweekkly (weeks 6-8) standup meetings
- Kanban board through Teams 

### What I wanted to accomplish
The optimistic end-product for this project was a single webpage that pulled data directly from [Chicago Data Portal](https://data.cityofchicago.org/) APIs and built data visualizations in a scrollytelling format à la [Pudding](https://pudding.cool/) (check out their visual essays on [how fluid middle-class families are](https://pudding.cool/2020/08/income/) on the U.S. income distribution and [what prosecution data tell us](https://pudding.cool/2019/10/prosecutors/) about a new state's attorney). The charts would have simple visual hierarchy and elegant annotations, and the code handling the JSON files would be neat and abstract.

### What I actually ended up with
…not exactly that. And that's okay! I built out [a simple webpage](https://crunes.github.io/chi-covid19-narrative/) with interactive charts using the [Chicago Design System](https://github.com/Chicago/design-system-site) hosted on GitHub Pages, in a repo with one HTML and one JavaScript file. Our team is exploring ways we can repurpose this template as a product parallel to City dashboards.

_Example 1. Rising COVID-19 case rates among 18 to 29 year olds in the latter half of the summer_
![Image](https://github.com/crunes/chi-covid19-narrative/blob/master/files/chart1.jpg)

## My decidedly-non-linear-journey with JavaScript and chart.js
Before I started my fellowship with the City, I programmed in Python and R but hadn't written in line of HTML or JavaScript in over 10 years. I used a variety of open-source tools 

### Open-source resources and tools
- __[CodePen](https://codepen.io/about/)__: a social development environment that allows you to write code in the browser, and see the results of it as you build. Primarily focuses on front-end languages like HTML, CSS, JavaScript, and preprocessing syntaxes that turn into those things.
- __[Figma](https://www.figma.com/@chicago)__: a vector graphics editor and prototyping tool. Primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows
- __[The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)__: a YouTube channel with Daniel Schiffman, dedicated to beginner-friendly creative coding tutorials and challenges
- __[Observable](https://observablehq.com/)__: a web-first, thoughtfully collaborative, computational notebook. Primarily used with front-end languages like JavaScript.
- __[Jupyter Notebook](https://jupyter.org/)__: an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text. Uses include data cleaning and transformation, numerical simulation, statistical modeling, data visualization, machine learning, and much more.

_Example 2. Older Chicagoans' case rate peak two and half times that of the citywide case rate_
![Image](https://github.com/crunes/chi-covid19-narrative/blob/master/files/chart2.png)

### Main takeaways from this project
- Tools are useful for troubleshooting specific problems, but they aren't a catch-all solution
  - CodePen's immediate visual feedback was helpful but debugging was difficult on a small (i.e., laptop) screen due to lack of viewing space
  - Observable notebooks were especially helpful for testing and debugging small blocks of JavaScript code
  - chart.js widget on Adobe Experience Manager works well for authors who have relatively simple datasets and know their data very well. However, it was not yet set up for importing large JSON files because the author would somehow need to filter columns/rows. 
- Start simple - get things working and abstract, and then add complexity
  - Sketched layout on paper first, then in Figma
  - Built one simple working chart before moving on to charts with annotations or charts that involved some calculation
  - Tested ideas in Python using Jupyter Notebook when I got stuck in JavaScript
- Ask for feedback early and often

## What's next?
- __Weigh the benefits and costs of shifting to D3 library__. Chart.js is relatively user-friendly for getting started with simple interactive charts, but adding custom elements - like vertical line tooltips and text annotations - was more complicated than I had anticipated. If our team has a flexible timeline, I would recommend moving to D3. This would also allow the team to develop data visualizations collaboratively over 
- __Brainstorm use cases with key City staff__. Our team has discussed how this kind of web page might be a useful product that parallels dashboards, but takes a more narrative-driven approach. Communications staff in all City agencies and departments might also have ideas about data they'd like to highlight. 
- __Continue to improve code for scalability and reproducibility__. This first-go at the code has a lot of room for improvement. The project developer(s) will need to update the script and any accompanying documentation as needed to make sure that others can reproduce this kind of web page with different data sources and chart styles
