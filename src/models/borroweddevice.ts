import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { User, Device } from "./";

@Table({
  tableName: "borrowed_devices",
})
export class BorrowedDevice extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  borrowId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Device)
  @Column(DataType.INTEGER)
  deviceId: number;

  @AllowNull(false)
  @Column(DataType.ENUM("BORROWED", "RETURNED"))
  status: "BORROWED" | "RETURNED";

  @Column(DataType.DATE)
  borrowDate: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
