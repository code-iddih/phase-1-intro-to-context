// =============== createEmployeeRecord() ===============

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// =============== createEmployeeRecords() ===============

function createEmployeeRecords(arrays) {
    // Map each array in `arrays` to an employee record using `createEmployeeRecord`
    return arrays.map(createEmployeeRecord);
}

// =============== createTimeInEvent() ===============

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    // Add a new time in event to `employee.timeInEvents`
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), // Convert hour to integer
        date: date,
    });

    return employee; // Return updated employee record
}

// =============== createTimeOutEvent() ===============

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    // Add a new time out event to `employee.timeOutEvents`
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), // Convert hour to integer
        date: date,
    });

    return employee; // Return updated employee record
}

// =============== hoursWorkedOnDate() ===============

function hoursWorkedOnDate(employee, date) {
    // Find the corresponding time in and time out events for `date`
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    // Calculate hours worked by subtracting time in hour from time out hour and dividing by 100
    return (timeOut.hour - timeIn.hour) / 100;
}

// =============== wagesEarnedOnDate() ===============

function wagesEarnedOnDate(employee, date) {
    // Calculate hours worked on `date`
    const hoursWorked = hoursWorkedOnDate(employee, date);
    
    // Calculate wages earned by multiplying hours worked by employee's pay rate per hour
    return hoursWorked * employee.payPerHour;
}

// =============== allWagesFor() ===============

function allWagesFor(employee) {
    // Get all dates worked by the employee from time in events
    const datesWorked = employee.timeInEvents.map(event => event.date);

    // Calculate total wages earned by summing up wages for each date
    return datesWorked.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
}

// =============== calculatePayroll() ===============

function calculatePayroll(employees) {
    // Calculate total payroll by summing up all wages for each employee
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

// =============== EXAMPLE ===============

let employeeRecords = createEmployeeRecords([
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Supervisor", 20]
]);

// Add time in and time out events for employees

createTimeInEvent(employeeRecords[0], "2024-07-10 0800");
createTimeInEvent(employeeRecords[1], "2024-07-10 0900");


// Example calculations and outputs

console.log(hoursWorkedOnDate(employeeRecords[0], "2024-07-10")); // It Outputs 9
console.log(wagesEarnedOnDate(employeeRecords[0], "2024-07-10")); // It Outputs 225
console.log(allWagesFor(employeeRecords[0])); // It Outputs 225
console.log(calculatePayroll(employeeRecords)); // It Outputs 825
