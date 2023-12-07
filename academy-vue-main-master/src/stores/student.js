import { defineStore } from 'pinia';

export const useStudentStore = defineStore('student', {
  state: () => ({
    name: '',
    email: '',
    lms_id: '',
    genesis_id: '',
  }),
  actions: {
    updateStudent(student,name) {
      this.email = student.student_email;
      this.lms_id = student.student_id;
      this.name = name;

    },
    updateStudentProfile(student) {
      // this.name = student.name;
      this.genesis_id = parseInt(student.student_id)
    }
  },
  //   getters: {
  //     doubleCount: (state) => state.counter * 2,
  //   },
});
