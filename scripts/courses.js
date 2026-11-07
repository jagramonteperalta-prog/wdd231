const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development",
        credits: 2,
        completed: false
    },
]

const courselist = document.querySelector("#course-list");

function displayCourses(courseArray) {
    courselist.innerHTML = "";

    courseArray.forEach(course => {
        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        courselist.appendChild(courseCard);
    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    const creditTotal = document.createElement("p");
    creditTotal.textContent = `The total credit for courses listed above is ${totalCredits}`;

    courselist.appendChild(creditTotal);
}

function filterCourses(subject) {
    let filteredCourses;

    if (subject === "ALL") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === subject);
    }

    displayCourses(filteredCourses);
}

document.querySelector("#all-courses").addEventListener("click", () => {
    filterCourses("ALL");
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    filterCourses("CSE");
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    filterCourses("WDD");
});

displayCourses(courses);