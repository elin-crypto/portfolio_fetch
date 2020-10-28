const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browsersync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");

sass.compiler = require('node-sass');

//search paths
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    imgPath: "src/images/*",
    sassPath: "src/sass/*.scss"
}

//TASKS
// Copy html files
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub')
    );
}

//concat, minify and copy js-files
function jsTask() {
    return src(files.jsPath)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(uglify())  
        .pipe(sourcemaps.write("."))
        .pipe(dest('pub/js')
    );
}

// concat, minify and copy sass-files
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(sourcemaps.write("./maps"))
        .pipe(dest("pub/sass")
    );
}

//minify and copy images 
function imgTask() {
    return src(files.imgPath)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('pub/images')
    );
}

//Browsersync - reload the page when changes are made
function somethingHappend() {
    browsersync.init( {
        server: {
            baseDir: './pub/'
        }
    });
    
    //Watching for changes
    watch([files.htmlPath, files.jsPath, files.sassPath, files.imgPath], 
        parallel(copyHTML, jsTask, sassTask, imgTask));

    watch(['pub/js', 'pub', 'pub/images', 'pub/sass']).on('change', browsersync.reload);

}


//default TASKS
exports.default = series(
    parallel(copyHTML, jsTask, sassTask, imgTask),
    somethingHappend
);