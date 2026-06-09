const mongoose = require("mongoose");
const Teacher = require("../models/teacher");

// Dummy teachers
const dummyTeachers = [
  // 1-10: JECRC College
  { name:"Amit Sharma", email:"amit.sharma@jecrc.edu", phoneNo:"9222000001", password:"teach123", classId:"BTech-1", subjectsTaught:["Math","Physics"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Priya Singh", email:"priya.singh@jecrc.edu", phoneNo:"9222000002", password:"teach123", classId:"BTech-1", subjectsTaught:["English","History"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Rohit Gupta", email:"rohit.gupta@jecrc.edu", phoneNo:"9222000003", password:"teach123", classId:"BTech-2", subjectsTaught:["Chemistry","Biology"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Neha Verma", email:"neha.verma@jecrc.edu", phoneNo:"9222000004", password:"teach123", classId:"BTech-2", subjectsTaught:["Math"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Vikram Jain", email:"vikram.jain@jecrc.edu", phoneNo:"9222000005", password:"teach123", classId:"BTech-3", subjectsTaught:["Physics","Chemistry"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Anjali Mehta", email:"anjali.mehta@jecrc.edu", phoneNo:"9222000006", password:"teach123", classId:"BTech-3", subjectsTaught:["English"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Siddharth Rao", email:"siddharth.rao@jecrc.edu", phoneNo:"9222000007", password:"teach123", classId:"BTech-4", subjectsTaught:["History"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Ritu Kapoor", email:"ritu.kapoor@jecrc.edu", phoneNo:"9222000008", password:"teach123", classId:"BTech-4", subjectsTaught:["Biology"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Manish Yadav", email:"manish.yadav@jecrc.edu", phoneNo:"9222000009", password:"teach123", classId:"BTech-5", subjectsTaught:["Math","English"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },
  { name:"Pooja Bhatt", email:"pooja.bhatt@jecrc.edu", phoneNo:"9222000010", password:"teach123", classId:"BTech-5", subjectsTaught:["Physics"], location:{latitude:26.8853,longitude:75.7855}, college:"JECRC College" },

  // 11-20: JECRC University
  { name:"Arjun Khanna", email:"arjun.khanna@jecrcuni.edu", phoneNo:"9222000011", password:"teach123", classId:"BTech-1", subjectsTaught:["Math","Physics"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Sanya Malhotra", email:"sanya.malhotra@jecrcuni.edu", phoneNo:"9222000012", password:"teach123", classId:"BTech-1", subjectsTaught:["English","History"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Karan Mehra", email:"karan.mehra@jecrcuni.edu", phoneNo:"9222000013", password:"teach123", classId:"BTech-2", subjectsTaught:["Chemistry","Biology"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Isha Jain", email:"isha.jain@jecrcuni.edu", phoneNo:"9222000014", password:"teach123", classId:"BTech-2", subjectsTaught:["Math"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Raghav Bansal", email:"raghav.bansal@jecrcuni.edu", phoneNo:"9222000015", password:"teach123", classId:"BTech-3", subjectsTaught:["Physics","Chemistry"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Tanvi Sharma", email:"tanvi.sharma@jecrcuni.edu", phoneNo:"9222000016", password:"teach123", classId:"BTech-3", subjectsTaught:["English"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Devansh Kapoor", email:"devansh.kapoor@jecrcuni.edu", phoneNo:"9222000017", password:"teach123", classId:"BTech-4", subjectsTaught:["History"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Mira Patel", email:"mira.patel@jecrcuni.edu", phoneNo:"9222000018", password:"teach123", classId:"BTech-4", subjectsTaught:["Biology"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Saurabh Goyal", email:"saurabh.goyal@jecrcuni.edu", phoneNo:"9222000019", password:"teach123", classId:"BTech-5", subjectsTaught:["Math","English"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },
  { name:"Nisha Verma", email:"nisha.verma@jecrcuni.edu", phoneNo:"9222000020", password:"teach123", classId:"BTech-5", subjectsTaught:["Physics"], location:{latitude:26.9124,longitude:75.7873}, college:"JECRC University" },

  // 21-30: Arya College
  { name:"Aditya Sharma", email:"aditya.sharma@arya.edu", phoneNo:"9222000021", password:"teach123", classId:"BTech-1", subjectsTaught:["Math","Physics"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Radhika Singh", email:"radhika.singh@arya.edu", phoneNo:"9222000022", password:"teach123", classId:"BTech-1", subjectsTaught:["English","History"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Vivek Mehta", email:"vivek.mehta@arya.edu", phoneNo:"9222000023", password:"teach123", classId:"BTech-2", subjectsTaught:["Chemistry","Biology"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Priyanka Sharma", email:"priyanka.sharma@arya.edu", phoneNo:"9222000024", password:"teach123", classId:"BTech-2", subjectsTaught:["Math"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Rajesh Kumar", email:"rajesh.kumar@arya.edu", phoneNo:"9222000025", password:"teach123", classId:"BTech-3", subjectsTaught:["Physics","Chemistry"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Sakshi Jain", email:"sakshi.jain@arya.edu", phoneNo:"9222000026", password:"teach123", classId:"BTech-3", subjectsTaught:["English"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Harsh Verma", email:"harsh.verma@arya.edu", phoneNo:"9222000027", password:"teach123", classId:"BTech-4", subjectsTaught:["History"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Neelam Patel", email:"neelam.patel@arya.edu", phoneNo:"9222000028", password:"teach123", classId:"BTech-4", subjectsTaught:["Biology"], location:{latitude:26.8340,longitude:75.8226}, college:"Arya College" },
  { name:"Pranav Gupta", email:"pranav.gupta@arya.edu", phoneNo:"9222000029", password:"teach123", classId:"BTech-5", subjectsTaught:["Math","English"], location:{latitude:26.8340,longitude:75.8226}},
  // 41-50: MNIT Jaipur
{ name:"Ankit Sharma", email:"ankit.sharma@mnit.ac.in", phoneNo:"9222000041", password:"teach123", classId:"BTech-1", subjectsTaught:["Math","Physics"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Swati Verma", email:"swati.verma@mnit.ac.in", phoneNo:"9222000042", password:"teach123", classId:"BTech-1", subjectsTaught:["English","History"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Rohit Jain", email:"rohit.jain@mnit.ac.in", phoneNo:"9222000043", password:"teach123", classId:"BTech-2", subjectsTaught:["Chemistry","Biology"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Neha Kapoor", email:"neha.kapoor@mnit.ac.in", phoneNo:"9222000044", password:"teach123", classId:"BTech-2", subjectsTaught:["Math"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Vikas Gupta", email:"vikas.gupta@mnit.ac.in", phoneNo:"9222000045", password:"teach123", classId:"BTech-3", subjectsTaught:["Physics","Chemistry"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Pooja Sharma", email:"pooja.sharma@mnit.ac.in", phoneNo:"9222000046", password:"teach123", classId:"BTech-3", subjectsTaught:["English"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Saurabh Mehta", email:"saurabh.mehta@mnit.ac.in", phoneNo:"9222000047", password:"teach123", classId:"BTech-4", subjectsTaught:["History"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Ritika Singh", email:"ritika.singh@mnit.ac.in", phoneNo:"9222000048", password:"teach123", classId:"BTech-4", subjectsTaught:["Biology"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Aditya Verma", email:"aditya.verma@mnit.ac.in", phoneNo:"9222000049", password:"teach123", classId:"BTech-5", subjectsTaught:["Math","English"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" },
{ name:"Sakshi Jain", email:"sakshi.jain@mnit.ac.in", phoneNo:"9222000050", password:"teach123", classId:"BTech-5", subjectsTaught:["Physics"], location:{latitude:26.9124,longitude:75.7873}, college:"MNIT Jaipur" }

];

mongoose.connect("mongodb://127.0.0.1:27017/disasterDB", )
  .then(async () => {
    console.log("MongoDB connected (Teachers)");
    // Save each teacher to trigger pre-save password hashing
    for (let teacherData of dummyTeachers) {
      const teacher = new Teacher(teacherData);
      await teacher.save();
    }
    console.log("Teachers seeded successfully!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
