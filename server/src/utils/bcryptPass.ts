import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  return hashedPass;
};

export const checkPassword = async (
  password: string,
  hashedPass: string
): Promise<boolean> => {
  //Directly returning cuz it returns boolean anyways
  return bcrypt.compare(password, hashedPass);
};
