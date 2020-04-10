# COVID 19 Helper

COVID 19 is a web-based application to help people locate goods and services near their location.<br />
COVID 19 crisis has caused many shops to close, while there are many new services which have come up to help people in need.<br />
The information about these entities is spread via social networks like Facebook, and WhatsApp.<br />
There is no central repository, and discoverability is extremely limited.<br />
The likelihood of a person in need being able to discover any of these depends on the probability of the person being in the same WhatsApp group (which are multiple) as the group in which information was shared.<br />
The information inside such social networks becomes lost typically after a few hours, as new messages gain attention, and older ones get buried deep in history.

## Use cases
1. Sahil has volunteered to prepare food for 500 people at his home. This is not his primary vocation, and he will stop preparing food after the crisis is over. Another person, Sid wants to find places delivering such meals. Sahil advertises about the food in local WhatsApp groups, and Facebook pages.
1. Sid wants to get groceries and medicines delivered to his home. Many shops are now shut, or are no longer delivering due to shortage of man power. How does he find out which ones near his house are still delivering?
1. Sid wants to know about various helplines catering to his area for people in need.

<img src="https://raw.githubusercontent.com/lihas/COVID19Helper/master/misc/demo.gif" alt="alt text" width="500">
![Demo](misc/demo.gif | width=450)

## Aim of the website
1. A local search engine built for crises like COVID19.
1. Open source code and implementation details so that people anywhere in the world can use it.

## Desing guidelines
1. Mobile-first. We expect more people to access this website over mobile phones than desktops.
1. Localization. Since this is meant for common masses, it should be easy to localize.
1. Low on resource usage. Mobile internet may not work as efficiently in times of crises. The website should be accessible even on the slowest connection.
1. Simple interface. Our primary audience will not be tech-savvy. It will constitute of old people, and others who are finding it difficult to carry on day by day activities due to the crisis. Deliver less features, but deliver them well.

## Volunteers needed
Developing any software takes man-hours. Since this is a not for profit open source software meant for use by the community at large, it is imperative that the development too be done by the community - A software by, and for the people.
There are many areas you can contribute - coding, testing, documentation, data gathering.

1. **Testing**
This is a mobile-first website. There are hundred of different mobiles out there - the OS, screen size, screen resolution, native language, web browser being used, and its version. If we count the total permutations, it comes out to be quite large. The volunteers will test the website on their mobile phone to make sure we cover as many devices as possible before releasing software to the public.

1. **Documentation**
It is important for us to let people know about our work. This will help attract users, more volunteers, etc.
The website has to have a help section. We have to create documents like this readme file for volunteers who may be interested in contributing.

1. **Data gathering**
The information about these temporary services are right now shared in WhatsApp, and Facebook groups. We will have to collect data from all such sources, and upload to the website. We will have to make ensure the validity of data. eg. a medicine store offering deliveries 10 days ago may longer be doing so. of course we will also have a form on the website where a person can enter such information directly, but to ensure database is as big as possible, and hence as useful to users as possible, we will have to use all possible means to get data.

1. **Coding**
Any person with coding experience can contribute. Web technologies - javascript, etc. preferred, but since these are quite easy to develop in, a person which programming experience with other technologies would not find it difficult.

#Downloading and building code.
1. Clone repo
```bash
git clone https://github.com/lihas/COVID19Helper.git
```
2. Install required node modules
```bash
npm init
npm install webpack webpack-cli
npm install babel-cli@6 babel-preset-react-app@3
npm install --save-dev babel-cli

npm install react
npm install react-dom react-localization
npm install @material-ui/core
npm install @material-ui/icons --save
npm install  url-loader --save
npm install eslint --save-dev
```

If you want to work on amazon lambda development (website backend) install additional modules.
```bash
npm install uuid --save
npm install --save dynamodb-geo
```

3. A note on directory structure <br />
COVID19Helper\website contains all code related to the website.
COVID19Helper\amazon-lambda contains all code related to the backend - AWS lambda.
We make changes to files in COVID19Helper\website\JSXSRC folder. The .js files are written in JSX, and are transpiled into js files by babel (command given below). These transpiled files are kept in src folder. webpack (command given below) takes files from src folder and packages them into files in dist folder.
dist folder has the files which we put on web server. <br />
index.html is always directly edited from dist folder, as it doesn't require the transformations like the js files. <br />
Thus, the journey of a js file would be: <br />
COVID19Helper\website\JSXSRC -> COVID19Helper\website\src -> COVID19Helper\website\dist
node modules are present in COVID19Helper\website\node_modules, and COVID19Helper\node_modules

4. Compile files. <br />
    You will need 2 powershell windows. Both with COVID19Helper\website as the working directory.
    1. In the first powershell window run the following command.
    ```bash
    npx babel --watch JSXSRC --out-dir src --presets react-app/prod --copy-files
    ```
    This command will not end, but will keep on monitoring JSXSRC folder for any changes.
    1. In the second powershell window run webpack command after every change you make. This will give you the required files in COVID19Helper\website\dist folder. <br /> -d switch is for development build.
    ```bash
    npx webpack-cli --module-bind 'png=url-loader'
    npx webpack-cli -d --module-bind 'png=url-loader'
    ```
    <br/>
    Note that 1st command (babel) has to be run only once, while second command (webpack) has to be run whenever you want all code changes that you have made so far to be reflected in COVID19Helper\website\dist folder.
5. Run a local web server and serve files from dist folder. You have several options
    1. simple python http server (not advised)
    ```python
    python3 -m http.server 80
    ```
    1. Install xampp (https://www.apachefriends.org/download.html) <br />
    XAMPP server serves files from C:\xampp\htdocs by default.
    You can either copy files from dist folder to this folder every time you make a change, or can make a directory junction link (windows)
    so that a subfolder of C:\xampp\htdocs always points to dist folder. ,br />
    Eg. (admin command prompt)
    ```bash
    C:\xampp\htdocs>mklink /J d "C:\sahil\personal\Charity\COVID19Helper\website\dist"
    ```
    Now when you will browse to http://localhost/d you will get files from dist folder

