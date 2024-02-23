import { Request, Response } from "express";
import { Skill, UserSkill } from "../models";

export const getSkillUserCounts = async (req: Request, res: Response) => {
  const { min_frequency, max_frequency } = req.query;
  try {
    // lower and upper bound paramaters for users per skill
    const min_users =
      typeof min_frequency === "string"
        ? parseInt(min_frequency, 10)
        : undefined;
    const max_users =
      typeof max_frequency === "string"
        ? parseInt(max_frequency, 10)
        : undefined;

    if (min_users && max_users && min_users > max_users) {
      res.status(400).send("Max frequency cannot be less than min frequency");
    }
    if ((min_users && min_users < 0) || (max_users && max_users < 0)) {
      res.status(400).send("Frequency cannot be negative.");
    }
    // Fetch all skills
    const skills = await Skill.findAll();

    // For each skill, count the number of users from user_skills table
    let skillCounts = await Promise.all(
      skills.map(async (skill) => {
        const count = await UserSkill.count({
          where: { skillId: skill.id },
        });

        return {
          skill: skill.title,
          frequency: count,
        };
      })
    );

    if (min_users || max_users) {
      skillCounts = skillCounts.filter(({ frequency }) => {
        return (
          (!min_users || frequency >= min_users) &&
          (!max_users || frequency <= max_users)
        );
      });
    }

    res.status(200).json(skillCounts);
  } catch (error) {
    console.error("Failed to fetch skills with user counts:", error);
    res.status(500).send("Internal Server Error");
  }
};
