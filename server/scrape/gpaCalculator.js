const customizedFilter = {
  notInAvg: /WKRPT|PD/i
};

// return the fpo correspondence of a course
exports.course_fpo = function course_fpo(course) {
  let percentage_grade = course.percentage_grade;
  if (percentage_grade >= 90) return 4.0;
  else if (percentage_grade >= 85) return 3.9;
  else if (percentage_grade >= 80) return 3.7;
  else if (percentage_grade >= 77) return 3.3;
  else if (percentage_grade >= 73) return 3.0;
  else if (percentage_grade >= 70) return 2.7;
  else if (percentage_grade >= 67) return 2.3;
  else if (percentage_grade >= 63) return 2.0;
  else if (percentage_grade >= 60) return 1.7;
  else if (percentage_grade >= 57) return 1.3;
  else if (percentage_grade >= 53) return 1.0;
  else if (percentage_grade >= 50) return 0.7;
  else return 0.0;
};

function course_filter(lowerbound, upperbound, force, course, courseLetterRegex) {
  if (course.percentage_grade === undefined) return false;
  if (force) return true;
  if (isNaN(course.percentage_grade)) return false;
  if (course.percentage_grade < lowerbound) return false;
  if (course.percentage_grade > upperbound) return false;
  if (courseLetterRegex !== undefined && courseLetterRegex.test(course.course_letter)) return false;
  return true;
}

// add fpo for courses without fpo
exports.courses_add_fpo = function courses_add_fpo(courses) {
  courses.forEach(course => {
    if (course_filter(0, 100, false, course)) {
      course.tag['hasGrade'] = true;
    } else course.tag['hasGrade'] = false;
  });
  courses.forEach(course => {
    if (course.tag['hasGrade']) course.fpo_scale = exports.course_fpo(course);
  });
};

// calculate avg_fpo for given courses
exports.courses_avg_fpo = function courses_avg_fpo(courses) {
  courses.forEach(course => {
    if (course_filter(0, 100, false, course, customizedFilter.notInAvg)) course.tag['InAvg'] = true;
    else course.tag['InAvg'] = false;
  });
  let [sum, count] = [0, 0];
  courses.forEach(course => {
    if (course.tag['InAvg']) {
      sum += course.fpo_scale;
      count++;
    }
  });
  const average = (sum / count).toFixed(2);
  return average;
};
