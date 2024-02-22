import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
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
  @AutoIncrement
  @Column(DataType.INTEGER)
  readonly id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

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
