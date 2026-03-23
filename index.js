// import jsonfile from "jsonfile";
// import moment from "moment";
// import { simpleGit } from "simple-git";
// import random from "random";

// const path = "./data.json";

// const markCommit = (x, y) => {
//     const date = moment()
//         .subtract(1, "y")
//         .add(1, "d")
//         .add(x, "w")
//         .add(y, "d")
//         .format();

//     const data = {
//         date: date,
//     };

//     jsonfile.writeFile(path, data, () => {
//         simpleGit().add([path]).commit(date, { "--date": date }).push();
//     });
// };


// const makeCommits = (n) => {
//     if (n === 0) return simpleGit().push();
//     const x = random.int(0, 54);
//     const y = random.int(0, 6);
//     const date = moment()
//         .subtract(1, "y")
//         .add(1, "d")
//         .add(x, "w")
//         .add(y, "d")
//         .format("YYYY-MM-DDTHH:mm:ss");
//     const data = { date: date };

//     console.log("Writing data:", data);
//     console.log("Making commit for date:", date);

//     jsonfile.writeFile(path, data, (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         simpleGit()
//             .add([path])
//             .commit(date, { "--date": date }, () => makeCommits(--n));
//     });
// };
// 2;
// console.log("Starting commits");
// makeCommits(10);


import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (date) => {
    const data = {
        date: date,
    };

    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { "--date": date }).push();
    });
};

const makeCommits = (n) => {
    if (n === 0) return simpleGit().push();

    /// Generate a random day within any month of 2024
    const randomDay = random.int(25, 30); // Days range from 1 to 31
    const randomMonth = random.int(4, 5); // Months range from 0 (January) to 11 (December)
    const date = moment()
        .month(9) // Set month based on random value
        .year(2025) // Always set year to 2024
        .date(28)
        .hour(random.int(0, 23)) // Random hour
        .minute(random.int(0, 59)) // Random minute
        .second(random.int(0, 59)) // Random second
        .format(); // Format the date

    console.log(date);

    const data = {
        date: date,
    };

    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
    });
};

makeCommits(50);