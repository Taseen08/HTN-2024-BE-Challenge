import userProfileDataJSON from "./userdata.json";
import deviceDataJSON from "./devices.json";
import { UserProfile, Device } from "../types";

export const userProfiles: UserProfile[] = userProfileDataJSON;
export const devices: Device[] = deviceDataJSON;
