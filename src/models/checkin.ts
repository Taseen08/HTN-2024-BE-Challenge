import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  AllowNull,
  CreatedAt,
  Unique,
} from "sequelize-typescript";
import { User } from "./";

@Table({
  tableName: "user_checkins",
})
export class UserCheckIns extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  checkinId: number;

  @ForeignKey(() => User)
  @Unique
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.ENUM("SCAN", "DASHBOARD"))
  checkinSource: "SCAN" | "DASHBOARD";

  @Column(DataType.TEXT)
  notes: string;

  @CreatedAt
  createdAt: Date;
}
