import { Request, Response } from "express";
import { User, Skill, UserSkill, UserCheckIns } from "../models";
import { UpdateUserPayload } from "../types";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["title"],
          through: {
            attributes: ["rating"], // Include the 'rating' from the UserSkill join table
          },
        },
      ],
    });

    const formattedUsers = users.map((user) => ({
      name: user.name,
      company: user.company,
      email: user.email,
      phone: user.phone,
      skills: user.skills.map((skill) => ({
        skill: skill.title,
        rating: (skill as any).UserSkill?.rating,
      })),
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Failed to get all users due to:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const id = parseInt(userId, 10);
    const user = await User.findByPk(id, {
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["title"],
          through: {
            attributes: ["rating"], // Include the 'rating' from the UserSkill join table
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const formattedUser = {
      name: user.name,
      company: user.company,
      email: user.email,
      phone: user.phone,
      skills: user.skills.map((skill) => ({
        skill: skill.title,
        rating: (skill as any).UserSkill?.rating,
      })),
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Failed to get all users due to:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const payload: UpdateUserPayload = req.body;

  try {
    const id = parseInt(userId, 10);
    const { skills, ...userData } = payload;

    // Update user details
    const [updateCount, updatedUsers] = await User.update(userData, {
      where: { id },
      returning: true,
    });

    if (updateCount === 0) {
      return res.status(404).json({ message: "User couldn't be updated." });
    }

    // Get the updated user
    const user = updatedUsers[0];

    // Check if there are skills in the update payload and handle them
    if (skills && skills.length > 0) {
      for (const { skill, rating } of skills) {
        // Find or create skill
        const [updatedSkill] = await Skill.findOrCreate({
          where: { title: skill },
          defaults: { title: skill },
        });

        // Update or create user-skill entry
        await UserSkill.upsert({
          userId: id,
          skillId: updatedSkill.id,
          rating: rating,
        });
      }
    }

    // Fetch updated user details with skills
    const updatedUser = await User.findByPk(id, {
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["title"],
          through: {
            attributes: ["rating"],
          },
        },
      ],
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const formattedUser = {
      name: updatedUser.name,
      company: updatedUser.company,
      email: updatedUser.email,
      phone: updatedUser.phone,
      skills: updatedUser.skills.map((skill) => ({
        skill: skill.title,
        rating: (skill as any).UserSkill?.rating,
      })),
    };

    // Return the updated user data
    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error(`Error updating user with id ${userId}:`, error);
    return res.status(500).send("Internal Server Error");
  }
};

export const checkInUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { source, notes } = req.body;

  // Ensure the source is either 'SCAN' or 'DASHBOARD'
  if (source != "scan" && source != "dashboard") {
    return res.status(400).send({ message: "Invalid check-in source." });
  }

  try {
    // Validate the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("Hacker is not a registered user.");
    }

    // Check if the user is already checked in
    const alreadyCheckedIn = await UserCheckIns.findOne({
      where: { userId },
    });

    if (alreadyCheckedIn) {
      return res
        .status(400)
        .send(`Hacker ${user?.name} was already checked in to HTN 2024!`);
    }

    // Perform the check-in
    await UserCheckIns.create({
      userId,
      notes,
      checkinSource: source.toUpperCase(),
    });

    res.send(
      `Hacker ${user?.name} has been successfully checked in to HTN 2024!`
    );
  } catch (error) {
    console.error("Error checking in user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
