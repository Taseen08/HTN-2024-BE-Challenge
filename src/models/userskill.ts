import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { User, Skill } from "./";

@Table({
  tableName: "user_skills",
})
export class UserSkill extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @PrimaryKey
  @ForeignKey(() => Skill)
  @Column(DataType.INTEGER)
  skillId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  rating: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
