import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    mobileNo: {
      type: Number,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    degree: {
      type: String,
    },
    college: {
      type: String,
    },
    branch: {
      type: String,
    },
    educationalStandard: {
      type :String ,
      // qualifications
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", Schema);
