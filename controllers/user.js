import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User does't exits", 400));
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const editUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user){
      return next(new ErrorHandler("User not found", 400));
    }

    else{
      const currentPassword = req.body.currentPassword;
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (isMatch){
        const {
          name,
          email,
          newPassword,
          mobileNo,
          gender,
          dob,
          degree,
          college,
          branch,
          educationalStandard,
          profileImage,
        } = req.body;
    
        if (name) {
          user.name = name;
        }
  
        if (email) {
          user.email = email;
        }

        if (mobileNo) {
          user.mobileNo = mobileNo;
        }
    
        if (dob) {
          user.dob = dob;
        }
    
        if (gender) {
          user.gender = gender;
        }
    
        if (profileImage) {
          user.profileImage = profileImage;
        }
        if (degree) {
          user.degree = degree;
        }

        if (college) {
          user.college = college;
        }

        if (branch) {
          user.branch = branch;
        }

        if (educationalStandard) {
          user.educationalStandard = educationalStandard;
        }

        if (newPassword) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
        }
    
        await user.save();
    
        sendCookie(user, res, "Profile Updated Successfully", 200);
      }

      else{
        return next(new ErrorHandler("Invalid password", 400));
      }
    }
 
  } catch (error) {
    next(error);
  }
};

export const deleteUserAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user){
      return next(new ErrorHandler("User not found", 400));
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "Account delete successfully!",
    });

  } catch(error){
    next(error)
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
