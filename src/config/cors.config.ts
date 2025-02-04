
import cors from "cors";

export const corstAllowAll = {
  credentials: true,
  origin: true,
  "Access-Control-Allow-Origin": "*",
};

export const corsConfig = () => {
  return cors(corstAllowAll);
};