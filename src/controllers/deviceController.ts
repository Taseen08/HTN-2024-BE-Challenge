import { Request, Response } from "express";
import { User, Device, BorrowedDevice } from "../models";

export const handleDeviceLending = async (req: Request, res: Response) => {
  const { action } = req.params;
  const { userId, deviceId } = req.body;

  try {
    // Devices can only be returned or borrowed
    if (action != "return" && action != "borrow") {
      return res
        .status(400)
        .send(
          "Invalid device operation. Devices can only be borrowed or returned"
        );
    }

    // Common validy checks required for both borrowing and returning devices
    if (!userId || !deviceId) {
      return res.status(400).send("Missing userId and/or deviceId");
    }
    // Check if the user is valid
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the device is valid
    const device = await Device.findByPk(deviceId);
    if (!device) {
      return res.status(404).send("Device is not registered in our system.");
    }
    // Common validity checks finished

    // Action specific logic starts here

    if (action == "borrow") {
      // Check if the device is already borrowed
      const borrowedDevice = await BorrowedDevice.findOne({
        where: { deviceId, status: "BORROWED" },
      });

      if (borrowedDevice) {
        return res.status(400).send("Device is already borrowed.");
      }

      await BorrowedDevice.create({
        userId,
        deviceId,
        status: "BORROWED",
        borrowDate: new Date(),
      });

      return res
        .status(200)
        .send(
          `Device ${deviceId} is successfully lend to hacker ${user?.name}!`
        );
    }

    if (action == "return") {
      // Check if the device was indeed borrowed by this hacker
      const borrowedDevice = await BorrowedDevice.findOne({
        where: { userId, deviceId, status: "BORROWED" },
      });

      if (!borrowedDevice) {
        return res.status(404).send("Device wasn't borrowed by this hacker.");
      }

      // Returned device status
      borrowedDevice.status = "RETURNED";
      await borrowedDevice.save();

      return res.send("Device returned successfully!");
    }
  } catch (error) {
    console.error("Error borrowing device:", error);
    return res.status(500).send("Internal Server Error");
  }
};
