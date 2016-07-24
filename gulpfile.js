let gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	webpack = require('gulp-webpack'),
	del = require('del');
	less = require('gulp-less');


gulp.task('lint', () => {
	return gulp.src('src/script/**/*.js')
			.pipe(eslint({
				"extends": "eslint:recommended",
				"parserOptions": {
					"ecmaVersion": 6,
					"sourceType": "module"
				},
				"rules": {
					"camelcase": 1
				},
				"fix": true
			}))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});

gulp.task('script', () => {
	return gulp.src('src/script/main.js')
			.pipe(webpack({
				output: {
					filename: 'main.js'
				},
				resolve: {
					alias: {
						handlebars: 'handlebars/dist/handlebars.min.js'
					}
				}
			}))
			.pipe(gulp.dest('dist/'));
});

gulp.task('style', () => {
	return gulp.src('src/style/**/*.less')
			.pipe(less())
			.pipe(gulp.dest('dist/style/'));
});

gulp.task('other', () => {
	return gulp.src('src/views/**/*')
			.pipe(gulp.dest('dist/views'));
});

gulp.task('clean', del.bind(null, ['dist/**']));

gulp.task('build', [ 'lint', 'script', 'style', 'other']);

gulp.task('default', ['clean'], () => {
	gulp.start('build');
});