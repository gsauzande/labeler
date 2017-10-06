# Labeler

Labeler is a web-based image labeling tool to help label images for use in Machine Learning. 
Inspiration for this app comes from "labelImg" at https://github.com/tzutalin/labelImg


## Getting Started

##### 1 - Clone this repository. On your console, write:

```
git clone https://github.com/gsauzande/labeler.git
```
##### 2 - Navigate into the recently created "labeler" folder with your console and run
```
npm install
```
##### 3 - Create a .env file with database credentials and a cookie secret
```
DB_HOST=<your database host. e.g: localhost>
DB_USER=<your database user. e.g: root>
DB_PASS=<your database password e.g: root>
DB_NAME=<your database name e.g: company>
DB_PORT=<your database PORT e.g: 3306>
COOKIE_SECRET=<something like but definitely not this one : H5ox6t4KqsMHYemXtOJ4mDqjKGru5UC3>
```
##### 4 - Inside the labeler run the command:
```
npm start
```
###### Note: you might want to install [nodemon](https://nodemon.io/) so that you don't have to manually restart the server with every change you make

That's all! You have the app running.

## Authors

* **Gásten Sauzande**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* The entire open source community
* The great tutorials and documentation makers for any of the tools used here
