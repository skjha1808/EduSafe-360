const mongoose = require("mongoose");
const Student = require("../models/student");

// Dummy students
const dummyStudents = [
  // 1-10: JECRC College
  { name:"Alice JECRC", email:"alice.jecrc@student.com", phoneNo:"9111000001", password:"pass123", classId:"BTech-1", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Bob JECRC", email:"bob.jecrc@student.com", phoneNo:"9111000002", password:"pass123", classId:"BTech-1", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Charlie JECRC", email:"charlie.jecrc@student.com", phoneNo:"9111000003", password:"pass123", classId:"BTech-2", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"David JECRC", email:"david.jecrc@student.com", phoneNo:"9111000004", password:"pass123", classId:"BTech-2", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Eve JECRC", email:"eve.jecrc@student.com", phoneNo:"9111000005", password:"pass123", classId:"BTech-3", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Frank JECRC", email:"frank.jecrc@student.com", phoneNo:"9111000006", password:"pass123", classId:"BTech-3", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Grace JECRC", email:"grace.jecrc@student.com", phoneNo:"9111000007", password:"pass123", classId:"BTech-4", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Hannah JECRC", email:"hannah.jecrc@student.com", phoneNo:"9111000008", password:"pass123", classId:"BTech-4", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Ian JECRC", email:"ian.jecrc@student.com", phoneNo:"9111000009", password:"pass123", classId:"BTech-5", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Judy JECRC", email:"judy.jecrc@student.com", phoneNo:"9111000010", password:"pass123", classId:"BTech-5", location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  // 11-20: JECRC University
  { name:"Alice Uni", email:"alice.uni@student.com", phoneNo:"9111000011", password:"pass123", classId:"BTech-1", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Bob Uni", email:"bob.uni@student.com", phoneNo:"9111000012", password:"pass123", classId:"BTech-1", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Charlie Uni", email:"charlie.uni@student.com", phoneNo:"9111000013", password:"pass123", classId:"BTech-2", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"David Uni", email:"david.uni@student.com", phoneNo:"9111000014", password:"pass123", classId:"BTech-2", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Eve Uni", email:"eve.uni@student.com", phoneNo:"9111000015", password:"pass123", classId:"BTech-3", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Frank Uni", email:"frank.uni@student.com", phoneNo:"9111000016", password:"pass123", classId:"BTech-3", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Grace Uni", email:"grace.uni@student.com", phoneNo:"9111000017", password:"pass123", classId:"BTech-4", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Hannah Uni", email:"hannah.uni@student.com", phoneNo:"9111000018", password:"pass123", classId:"BTech-4", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Ian Uni", email:"ian.uni@student.com", phoneNo:"9111000019", password:"pass123", classId:"BTech-5", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Judy Uni", email:"judy.uni@student.com", phoneNo:"9111000020", password:"pass123", classId:"BTech-5", location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  // 21-30: Arya College
  { name:"Alice Arya", email:"alice.arya@student.com", phoneNo:"9111000021", password:"pass123", classId:"BTech-1", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Bob Arya", email:"bob.arya@student.com", phoneNo:"9111000022", password:"pass123", classId:"BTech-1", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Charlie Arya", email:"charlie.arya@student.com", phoneNo:"9111000023", password:"pass123", classId:"BTech-2", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"David Arya", email:"david.arya@student.com", phoneNo:"9111000024", password:"pass123", classId:"BTech-2", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Eve Arya", email:"eve.arya@student.com", phoneNo:"9111000025", password:"pass123", classId:"BTech-3", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Frank Arya", email:"frank.arya@student.com", phoneNo:"9111000026", password:"pass123", classId:"BTech-3", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Grace Arya", email:"grace.arya@student.com", phoneNo:"9111000027", password:"pass123", classId:"BTech-4", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Hannah Arya", email:"hannah.arya@student.com", phoneNo:"9111000028", password:"pass123", classId:"BTech-4", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Ian Arya", email:"ian.arya@student.com", phoneNo:"9111000029", password:"pass123", classId:"BTech-5", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Judy Arya", email:"judy.arya@student.com", phoneNo:"9111000030", password:"pass123", classId:"BTech-5", location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  // 31-40: MNIT Jaipur
  { name:"Alice MNIT", email:"alice.mnit@student.com", phoneNo:"9111000031", password:"pass123", classId:"BTech-1", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"Bob MNIT", email:"bob.mnit@student.com", phoneNo:"9111000032", password:"pass123", classId:"BTech-1", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"Charlie MNIT", email:"charlie.mnit@student.com", phoneNo:"9111000033", password:"pass123", classId:"BTech-2", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"David MNIT", email:"david.mnit@student.com", phoneNo:"9111000034", password:"pass123", classId:"BTech-2", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"Eve MNIT", email:"eve.mnit@student.com", phoneNo:"9111000035", password:"pass123", classId:"BTech-3", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"Frank MNIT", email:"frank.mnit@student.com", phoneNo:"9111000036", password:"pass123", classId:"BTech-3", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"Grace MNIT", email:"grace.mnit@student.com", phoneNo:"9111000037", password:"pass123", classId:"BTech-4", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
  { name:"Hannah MNIT", email:"hannah.mnit@student.com", phoneNo:"9111000038", password:"pass123", classId:"BTech-4", location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
];

mongoose.connect("mongodb://127.0.0.1:27017/disasterDB")
  .then(async () => {
    console.log("MongoDB connected (Students)");
    // Save each student to trigger pre-save password hashing
    for (let studentData of dummyStudents) {
      const student = new Student(studentData);
      await student.save();
    }
    console.log("Students seeded successfully!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
