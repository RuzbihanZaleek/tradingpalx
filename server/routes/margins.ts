import { Router } from "express";
import { marginAlerts, MarginAlert } from "../margins";

const router = Router();

router.post("/", (req, res) => {
  const { coinId, coinSymbol, alertPrice, direction } = req.body;

  if (!coinId || !coinSymbol || !alertPrice || !direction) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newAlert: MarginAlert = {
    coinId,
    coinSymbol,
    alertPrice,
    direction,
    triggered: false,
  };

  marginAlerts.push(newAlert);
  res.json({ message: "Margin alert saved", alert: newAlert });
});

export default router;
