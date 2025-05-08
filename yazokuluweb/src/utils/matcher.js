export const matchCourses = (parsedCourses, targetCourses) => {
    const matched = [];
    const unmatched = [];
  
    targetCourses.forEach((target) => {
      const match = parsedCourses.find((tc) =>
        tc.courseName.toLowerCase().includes(target.courseName.toLowerCase()) ||
        tc.courseCode.toLowerCase() === target.courseCode.toLowerCase()
      );
  
      if (match) matched.push(target);
      else unmatched.push(target);
    });
  
    return { matched, unmatched };
  };
  