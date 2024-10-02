class Student {
    constructor(type = 'student') {
        this.type = type;
    }


    static isStudent(student) {
        return student instanceof Student;
    }

    studentId() {
        alert('202355570');
    }
}