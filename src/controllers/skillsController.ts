import { Request, Response } from "express";
import { Skill, UserSkill, User } from "../models";

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
      return res
        .status(400)
        .send("Max frequency cannot be less than min frequency");
    }
    if ((min_users && min_users < 0) || (max_users && max_users < 0)) {
      return res.status(400).send("Frequency cannot be negative.");
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

    return res.status(200).json(skillCounts);
  } catch (error) {
    console.error("Failed to fetch skills with user counts:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getTeamMatching = async (req: Request, res: Response) => {
  const { skill } = req.params;
  const { teamsize } = req.query;

  try {
    // default team size is 3
    const numHackers =
      typeof teamsize === "string" ? parseInt(teamsize, 10) : 3;

    if (!numHackers || numHackers <= 0) {
      return res
        .status(400)
        .send("Invalid team size specified. Should be positive integer.");
    }
    // Validate the skill exists
    const validSkill = await Skill.findOne({ where: { id: skill } });
    if (!validSkill) {
      return res
        .status(404)
        .send("Sorry. No hacker currently has the specified skill.");
    }

    // Find users with the specified skill
    const userSkills = await UserSkill.findAll({
      where: { skillId: validSkill.id },
    });

    if (userSkills.length >= numHackers) {
      // Create a team match
      const userNames = userSkills
        .slice(0, numHackers)
        .map((userSkill) => userSkill.userId);
      return res
        .status(200)
        .send(
          `Hackers (${userNames.join(
            ", "
          )}) would make a great team with common skill in ${validSkill.title}`
        );
    } else {
      return res
        .status(200)
        .send(
          `Not enough users with the ${validSkill.title} skill to form a team.`
        );
    }
  } catch (error) {
    console.error("Error in team matching:", error);
    return res.status(500).send("Internal Server Error");
  }
};
