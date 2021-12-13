import { Record, String, Static, Number } from "runtypes";

export let registerSchema = Record({
  email: String,
  password: String,
  password_confirmation: String,
});

export let loginSchema = Record({
  email: String,
  password: String,
});
