const gulp = require("gulp");
const sass = require("gulp-sass");
const webserver = require("gulp-webserver");

gulp.task("devSass", () => {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"))
})

gulp.task("watching", () => {
    return gulp.watch("./src/sass/*.scss", gulp.series("devSass"))
})
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 8888,
            open: true,
            livereload: true,
            proxies: [{
                    source: "/api/delData",
                    target: "http://localhost:3000/api/delData"
                },
                {
                    source: "/api/getList",
                    target: "http://localhost:3000/api/getList"
                },
                {
                    source: "/api/addData",
                    target: "http://localhost:3000/api/addData"
                }
            ]
        }))
})

gulp.task("default", gulp.series("devSass", "server", "watching"))