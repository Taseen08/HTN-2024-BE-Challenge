import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { UserSkill, User } from "./";

@Table({
  tableName: "skills",
})
export class Skill extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  readonly id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  title: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => User, () => UserSkill)
  users!: User[];
}
