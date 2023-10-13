class Payment {
    constructor(id, courses, total, date) {
        this.id = id;
        this.courses = courses;
        this.total = total;
        this.date = date;
    }

    // toJSON() {
    //     return {
    //         id: this.id,
    //         courses: this.courses,
    //         total: this.total,
    //         date: this.date
    //     };
    // }
}
export default Payment;