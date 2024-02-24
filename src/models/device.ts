import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AllowNull,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { BorrowedDevice, User } from "./";

@Table({
  tableName: "devices",
})
export class Device extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  readonly deviceId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => User, () => BorrowedDevice)
  users: User[];
}
