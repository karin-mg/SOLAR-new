var gulp         = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('concat', ['vendor_css', 'vendor_js']);

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/mainstyle.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('vendor_js', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'node_modules/jquery/dist/jquery.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
		'node_modules/slick-carousel/slick/slick.js'
		])
		.pipe(concat('vendor_js.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('vendor_css', ['sass'], function() {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
		'node_modules/slick-carousel/slick/slick.css',
	]) // Выбираем файл для минификации
		.pipe(concat('vendor_css.css')) // Собираем их в кучу в новом файле vendor.css
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за scss файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
	gulp.watch('app/css/mainstyle.css', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'sass'], function () {

    var buildCss = gulp.src([
        'app/css/mainstyle.css',
        'app/css/vendor_css.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src([
        'app/js/common.js',
        'app/js/vendor_js.min.js'
    ])
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    var buildImgs = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
