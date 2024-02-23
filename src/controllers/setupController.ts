import { Request, Response } from "express";
import { User, Skill, UserSkill } from "../models";
import { userProfiles } from "../data";

export const seedUserData = async (req: Request, res: Response) => {
  try {
    for (const userData of userProfiles) {
      // Insert user into the users table
      const [user, userCreated] = await User.findOrCreate({
        where: { email: userData.email },
        defaults: {
          name: userData.name,
          company: userData.company,
          email: userData.email,
          phone: userData.phone,
        },
      });

      for (const skillData of userData.skills) {
        // Insert skill into the skills table
        const [skill, skillCreated] = await Skill.findOrCreate({
          where: { title: skillData.skill },
          defaults: {
            title: skillData.skill,
          },
        });

        // Insert a record of user-skill relation to the associative user-skills table
        await UserSkill.findOrCreate({
          where: {
            userId: user.id,
            skillId: skill.id,
          },
          defaults: {
            userId: user.id,
            skillId: skill.id,
            rating: skillData.rating,
          },
        });
      }
    }

    res.status(200).send("User data imported successfully.");
  } catch (error) {
    console.error("Failed to import user data:", error);
    res.status(500).send("Failed to import user data.");
  }
};
