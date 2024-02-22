import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { User, Skill, UserSkill } from "../models";

export const seedUserData = async (req: Request, res: Response) => {
  try {
    // Path to the JSON file
    const dataPath = path.join(__dirname, "..", "data", "demodata.json");

    // Read and parse the JSON file
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const users = JSON.parse(rawData);

    for (const userData of users) {
      console.log(userData);

      // Insert user into the User table, avoiding duplicates based on a unique attribute like email
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
        // Insert skill into the Skill table, avoiding duplicates
        const [skill, skillCreated] = await Skill.findOrCreate({
          where: { title: skillData.skill },
          defaults: {
            title: skillData.skill,
          },
        });

        // Insert a record into the UserSkill join table
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
